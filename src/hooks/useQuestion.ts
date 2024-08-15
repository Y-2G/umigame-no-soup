import { QuestionContext } from "@/app/layout";
import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  question: string;
};

type Text = {
  from: "p" | "c";
  value: string;
};

export const useQuestion = () => {
  const methods = useForm<Inputs>();
  const [text, setText] = useState<Text[]>([]);

  const { question } = useContext(QuestionContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const prompt = `
  ## 前提
  あなたと私は「水平思考推理ゲーム」を行っています。
  出題者が提示する謎めいたシナリオに対し、解答者が「はい」か「いいえ」で答えられる質問をして、
  シナリオの真相を推理するゲームです。
  解答者は質問を繰り返しながら、出題者から得た情報をもとに真相を解明します。
  あなたは出題者で私が解答者です。
  
  ## ポイント
  質問に対して「はい」か「いいえ」で回答してください。
  質問が「はい」か「いいえ」に絞れない場合、「はい か いいえ で答えることができません」と回答してください。
  質問内容がシナリオから推測できない場合、「わかりません」と回答してください。
  
  ## シナリオ
  ${question?.description}
  
  ## 模範解答
  ${question?.answer}
  
  ## 質問
  ${data.question}
  `;

    try {
      // const response = await axios.post(
      //   URL,
      //   {
      //     model: "gpt-3.5-turbo",
      //     messages: [{ role: "user", content: data.example }],
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      //     },
      //   }
      // );
      // const chatgpt_response = response.data.choices[0].message.content;
      // console.log(chatgpt_response);
      console.log(prompt);
      setText([
        ...text,
        { from: "p", value: data.question },
        { from: "c", value: "c" },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      methods.reset();
    }
  };

  return {
    text,
    question,
    methods,
    onSubmit,
  };
};
