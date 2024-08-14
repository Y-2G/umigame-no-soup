"use client";

import { QuestionContext } from "@/app/layout";
import { Box, Button, Flex, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useSWR from "swr";

type Inputs = {
  question: string;
};

type Text = {
  from: "p" | "c";
  value: string;
};

const OPEN_AI_API_URL = process.env.NEXT_PUBLIC_OPEN_API_URL;
const OPEN_AI_API_KEY = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;
const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY;
const NOTION_DATA_BASE_ID = process.env.NEXT_PUBLIC_NOTION_DATA_BASE_ID;
const NOTION_VIEW_ID = process.env.NEXT_PUBLIC_NOTION_VIEW_ID;
const NOTION_API_BASE_URL = process.env.NEXT_PUBLIC_NOTION_API_BASE_URL;

type Props = {
  from: string;
  value: string;
};

const Comment = ({ from, value }: Props) => {
  return (
    <Flex gap={2} px={10} direction={from === "p" ? "row-reverse" : undefined}>
      <Flex
        w={10}
        h={10}
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        background={from === "p" ? "green.300" : "gray.300"}
      >
        {from}
      </Flex>
      <Box
        px={4}
        py={2}
        w="100%"
        borderRadius={6}
        background={from === "p" ? "green.300" : "gray.300"}
      >
        {value}
      </Box>
    </Flex>
  );
};

export default function Question() {
  const { register, reset, handleSubmit } = useForm<Inputs>();
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
      reset();
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const observer = new MutationObserver(scrollToBottom);
    if (scrollRef.current) {
      observer.observe(scrollRef.current, { childList: true });
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box h="100%">
      <Box h="calc(100% - 80px)">
        <Stack ref={scrollRef} h="100%" overflow="scroll">
          {text?.map((t, i) => (
            <Comment key={i} from={t.from} value={t.value} />
          ))}
        </Stack>
      </Box>
      <Box
        w="100%"
        h="80px"
        px={10}
        py={5}
        position="fixed"
        bottom="0"
        background="#fff"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={5}>
            <Textarea rows={1} {...register("question")} />
            <Button type="submit">送信</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
