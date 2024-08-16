"use client";

import { Message } from "@/components/message";
import { useMessage } from "@/hooks/useMessage";
import { Box, Button, Flex, Stack, Textarea } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { methods, messages, question, onSubmit } = useMessage();
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
      <Box h="80px" position="fixed" top={0} px={10} py={2} background="#fff">
        {question?.description}
      </Box>
      <Box h="calc(100% - 80px)" pt="80px">
        <Stack ref={scrollRef} h="100%" overflow="scroll">
          {messages?.map((t, i) => (
            <Message key={i} from={t.from} value={t.value} />
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
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Flex gap={5}>
            <Textarea rows={1} {...methods.register("message")} />
            <Button type="submit">送信</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
