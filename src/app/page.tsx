"use client";

import axios from "axios";
import React, { useContext } from "react";
import useSWR from "swr";
import { Box, LinkBox, Stack } from "@chakra-ui/react";
import { NotionQuestionResponce, Question } from "@/types/question";
import Link from "next/link";
import { QuestionContext } from "./layout";

export default function Select() {
  const url = `/api/notion`;
  const fetcher = async () => {
    const res = await axios.get<NotionQuestionResponce>(url);
    return res.data;
  };
  const { data } = useSWR(url, fetcher);

  const { setQuestion } = useContext(QuestionContext);
  const onClick = (question: Question) => {
    setQuestion({ ...question });
  };

  return (
    <Stack px={10} py={5}>
      {data?.map((e, i) => (
        <LinkBox
          key={i}
          as="article"
          px={4}
          py={2}
          borderWidth="1px"
          rounded="md"
          onClick={() => onClick(e)}
        >
          <Link href={`/question/${e.id}`}>
            <Box>{`title: ${e.title}`}</Box>
          </Link>
        </LinkBox>
      ))}
    </Stack>
  );
}
