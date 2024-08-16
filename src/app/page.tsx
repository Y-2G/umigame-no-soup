"use client";

import axios from "axios";
import React from "react";
import { Box, LinkBox, Stack } from "@chakra-ui/react";
import { NotionQuestionResponce, Question } from "@/types/question";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Select() {
  const getQuestion = async () => {
    const res = await axios.get<NotionQuestionResponce>(`/api/notion`);
    return res.data;
  };
  const { data } = useQuery({
    queryKey: ["get-question"],
    queryFn: getQuestion,
  });

  const queryClient = useQueryClient();
  const handleClick = (question: Question) => {
    queryClient.setQueryData<Question>(["select-quesiton"], { ...question });
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
          onClick={() => handleClick(e)}
        >
          <Link href={`/question/${e.id}`}>
            <Box>{`title: ${e.title}`}</Box>
          </Link>
        </LinkBox>
      ))}
    </Stack>
  );
}
