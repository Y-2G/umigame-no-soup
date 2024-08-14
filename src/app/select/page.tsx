"use client";

import axios from "axios";
import React, { useContext } from "react";
import useSWR from "swr";
import { Box, LinkBox, LinkOverlay, Stack } from "@chakra-ui/react";
import { NotionQuestionResponce, Question } from "@/types/question";
import { QuestionContext } from "../layout";
import Link from "next/link";

export default function Select() {
  const url = `http://localhost:3000/api/notion`;
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
    <Stack>
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
          <LinkOverlay>
            <Link href={`/question/${e.id}`}>
              <Box>{`title: ${e.title}`}</Box>
            </Link>
          </LinkOverlay>
        </LinkBox>
      ))}
    </Stack>
  );
}
