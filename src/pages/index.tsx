import React from "react";
import Link from "next/link";
import { Box, LinkBox, Stack } from "@chakra-ui/react";
import { useQuestion } from "@/hooks/useQuestion";

export default function Select() {
  const { questions, handleClick } = useQuestion();
  return (
    <Stack px={10} py={5}>
      {questions.map((e, i) => (
        <LinkBox
          key={i}
          as="article"
          px={4}
          py={2}
          borderWidth="1px"
          rounded="md"
          onClick={() => handleClick(e)}
        >
          <Link href={`/chat/${e.id}`}>
            <Box>{`title: ${e.title}`}</Box>
          </Link>
        </LinkBox>
      ))}
    </Stack>
  );
}
