import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Question } from "@/types/question";
import { BASE_PROMPT, OPEN_AI_API_KEY, OPEN_AI_API_URL } from "@/constants";
import axios from "axios";

type Inputs = {
  text: string;
};

type MessageFrom = "player" | "computer";

type Message = {
  text: string;
  from: MessageFrom;
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
    mutationFn: async (data: Message) => await postMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-messsage"],
      });
    },
  });

  const storeMessage = async (text: string, from: MessageFrom) => {
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

  const onSubmit: SubmitHandler<Inputs> = async ({
    text: playerText,
  }: Inputs) => {
    if (!playerText) {
      return;
    }
    try {
      await storeMessage(playerText, "player");
      const computerText = await getChatGptMessage(playerText);
      await storeMessage(computerText, "computer");
    } catch (error) {
      console.error(error);
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
