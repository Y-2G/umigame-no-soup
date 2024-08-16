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

type Inputs = {
  message: string;
};

type Message = {
  text: string;
  from: "p" | "c";
};

export const useMessage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const methods = useForm<Inputs>();
  const queryClient = useQueryClient();
  const question = queryClient.getQueryData<Question>(["select-quesiton"]);

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setMessages(messagesArray);
    });
    return () => unsubscribe();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // const prompt = `
    // ## 前提
    // あなたと私は「水平思考推理ゲーム」を行っています。
    // 出題者が提示する謎めいたシナリオに対し、解答者が「はい」か「いいえ」で答えられる質問をして、
    // シナリオの真相を推理するゲームです。
    // 解答者は質問を繰り返しながら、出題者から得た情報をもとに真相を解明します。
    // あなたは出題者で私が解答者です。

    // ## ポイント
    // 質問に対して「はい」か「いいえ」で回答してください。
    // 質問が「はい」か「いいえ」に絞れない場合、「はい か いいえ で答えることができません」と回答してください。
    // 質問内容がシナリオから推測できない場合、「わかりません」と回答してください。

    // ## シナリオ

    // ## 模範解答

    // ## 質問
    // ${data.message}
    // `;

    // try {
    //   const response = await axios.post(
    //     URL,
    //     {
    //       model: "gpt-3.5-turbo",
    //       messages: [{ role: "user", content: data.example }],
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${OPEN_AI_API_KEY}`,
    //       },
    //     }
    //   );
    //   const chatgpt_response = response.data.choices[0].message.content;
    //   console.log(chatgpt_response);
    //   console.log(prompt);
    // } catch (error) {
    //   console.log(error);
    // }

    if (data.message !== "") {
      await addDoc(collection(db, "message"), {
        text: data.message,
        createdAt: new Date(),
      });
      methods.reset();
    }
  };

  return {
    methods,
    messages,
    question,
    onSubmit,
  };
};
