"use client";

import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useSWR from "swr";

type Inputs = {
  example: string;
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

type CommentProps = {
  from: string;
  value: string;
};

const Comment = ({ from, value }: CommentProps) => {
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
export default function Home() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [text, setText] = useState<Text[]>([]);
  const notionApiUrl = `${NOTION_API_BASE_URL}/${NOTION_DATA_BASE_ID}`;
  console.log(NOTION_API_BASE_URL, NOTION_DATA_BASE_ID);
  const fetcher = async () => {
    return await axios.get(notionApiUrl, {
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };
  const { data } = useSWR(notionApiUrl, fetcher);
  console.log(notionApiUrl, data);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
      setText([
        ...text,
        { from: "p", value: data.example },
        { from: "c", value: "c" },
      ]);
    } catch (error) {
      console.log(error);
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
    <ChakraProvider>
      <Box h="100%">
        <Box h="calc(100% - 80px)">
          <Stack ref={scrollRef} h="100%" overflow="scroll" p={5}>
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
              <Textarea rows={1} {...register("example")} />
              <Button type="submit">送信</Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
