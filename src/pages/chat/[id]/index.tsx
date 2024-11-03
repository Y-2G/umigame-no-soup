import { QuestionDescription } from "@/components/chat/questionDescription";
import { ChatMessages } from "@/components/chat/chatMessages";
import { useMessage } from "@/hooks/useMessage";
import {
  Box,
  Button,
  Flex,
  Textarea,
  ClientOnly,
  Skeleton,
} from "@chakra-ui/react";
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
      <Box
        w="100%"
        h="80px"
        position="fixed"
        top={0}
        px={10}
        py={2}
        background="#cdcdcd"
      >
        <ClientOnly fallback={<Skeleton />}>
          <QuestionDescription question={question} />
        </ClientOnly>
      </Box>
      <Box h="calc(100% - 80px)" pt="90px">
        <ClientOnly fallback={<Skeleton />}>
          <ChatMessages messages={messages} />
        </ClientOnly>
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
            <Textarea rows={1} {...methods.register("text")} />
            <Button type="submit">送信</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
