import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  QuestionType,
  ChatInputType,
  ChatMessageType,
} from "@/types/question";
import { BASE_PROMPT, OPEN_AI_API_KEY, OPEN_AI_API_URL } from "@/constants";
import axios from "axios";
import { db } from "#/firebaseConfig";
import { query, collection, orderBy, getDocs, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export const useMessage = () => {
  const { user } = useAuth()
  const methods = useForm<ChatInputType>();
  const queryClient = useQueryClient();
  const question = queryClient.getQueryData<QuestionType>(["select-quesiton"]);

  // TODO: tanstackで何とかできないか
  // const getMessage = async () => {
  //   const q = query(collection(db, "message"), orderBy("createdAt"));
  //   const querySnapshot = await getDocs(q);
  //   return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // };

  // const messages = useQuery<any>({
  //   queryKey: ["get-messsage"],
  //   queryFn: getMessage,
  // });

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const postMessage = async (data: ChatMessageType) => {
    await axios.post(`/api/firebase`, data);
  };

  const mutationMessage = useMutation({
    mutationFn: async (data: ChatMessageType) => await postMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-messsage"],
      });
    },
  });

  const storeMessage = async (text: string, from: string) => {
    mutationMessage.mutate({
      text,
      from,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const getChatGptMessage = async (text: string) => {
    const prompt = `
${BASE_PROMPT}
## シナリオ
${question?.description}
## 模範解答
${question?.answer}
## 質問
${text}
`;

    const response = await axios.post(
      OPEN_AI_API_URL || "",
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        },
      }
    );

    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  };

  const onSubmit: SubmitHandler<ChatInputType> = async ({
    text: playerText,
  }: ChatInputType) => {
    if (!playerText) return;

    try {
      await storeMessage(playerText, user?.displayName ?? "unknown");
      const computerText = await getChatGptMessage(playerText);
      await storeMessage(computerText, "computer");
    } catch (error) {
      console.error(error);
    }
    methods.reset();
  };

  return {
    methods,
    messages,
    question,
    onSubmit,
  };
};
