import {
  query,
  collection,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Question } from "@/types/question";
import { BASE_PROMPT, OPEN_AI_API_KEY, OPEN_AI_API_URL } from "@/constants";
import axios from "axios";

type Inputs = {
  text: string;
};

type Message = {
  text: string;
  from?: "player" | "computer";
  createdAt: Date;
  updatedAt: Date;
};

export const useMessage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const methods = useForm<Inputs>();
  const queryClient = useQueryClient();
  const question = queryClient.getQueryData<Question>(["select-quesiton"]);

  const store = async (data: Message) => {
    await addDoc(collection(db, "message"), data);
    setMessages([...messages, data]);
  };

  const storePlayerMessage = async (data: Message) => {
    await store({ ...data, from: "player" });
  };

  const storeChatGptMessage = async (data: Message) => {
    const prompt = `
    ${BASE_PROMPT}
    ## シナリオ
    ${question?.description}
    ## 模範解答
    ${question?.answer}
    ## 質問
    ${data.text}
    `;

    const response = await axios.post(
      OPEN_AI_API_URL || "",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        },
      }
    );
    const text = response.data.choices[0].message.content;

    await store({ ...data, text, from: "computer" });
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ text }: Inputs) => {
    if (!text) {
      return;
    }
    try {
      const data = {
        text,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await storePlayerMessage(data);
      await storeChatGptMessage(data);
    } catch (error) {
      console.log(error);
    }
    methods.reset();
  };

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const { text, from, createdAt, updatedAt } = doc.data();
        return { id: doc.id, text, from, createdAt, updatedAt };
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return {
    methods,
    messages,
    question,
    onSubmit,
  };
};
