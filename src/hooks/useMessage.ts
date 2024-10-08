import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const methods = useForm<Inputs>();
  const queryClient = useQueryClient();
  const question = queryClient.getQueryData<Question>(["select-quesiton"]);

  const getMessage = async () => {
    const res = await axios.get(`/api/firebase`);
    return res.data;
  };
  const { data } = useQuery<Message[]>({
    queryKey: ["get-messsage"],
    queryFn: getMessage,
  });

  const postMessage = async (data: Message) => {
    await axios.post(`/api/firebase`, data);
  };

  const mutationMessage = useMutation({
    mutationFn: (data: Message) => postMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-messsage"],
      });
    },
  });

  const storePlayerMessage = async (data: Message) => {
    mutationMessage.mutate({ ...data, from: "player" });
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
    console.log(prompt);
    const text = response.data.choices[0].message.content;
    mutationMessage.mutate({ ...data, text, from: "computer" });
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ text }: Inputs) => {
    if (!text) {
      return;
    }
    try {
      const now = new Date();
      const data = { text, createdAt: now, updatedAt: now };
      await storePlayerMessage(data);
      setTimeout(async () => {
        await storeChatGptMessage(data);
      }, 300);
    } catch (error) {
      console.log(error);
    }
    methods.reset();
  };

  return {
    methods,
    messages: data,
    question,
    onSubmit,
  };
};
