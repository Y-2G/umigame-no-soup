import { Message } from "@/components/message";
import { useMessage } from "@/hooks/useMessage";
import { ChatMessageType, QuestionType } from "@/types/question";
import {
  Box,
  Button,
  Flex,
  Stack,
  Textarea,
  Text,
  ClientOnly,
  Skeleton,
} from "@chakra-ui/react";
import { ForwardedRef, forwardRef, useEffect, useRef } from "react";

const QuestionDescription = ({ question }: { question?: QuestionType }) => {
  if (!question?.description) {
    throw new Promise(() => {}); // Suspenseを待機状態にする
  }
  return <Text>{question.description}</Text>;
};

type QuestionMessagesProps = {
  messages?: ChatMessageType[];
};

const QuestionMessages = forwardRef(
  ({ messages }: QuestionMessagesProps, ref: ForwardedRef<HTMLDivElement>) => {
    if (!messages) {
      throw new Promise(() => {}); // Suspenseを待機状態にする
    }
    return (
      <Stack ref={ref} h="100%" overflow="scroll">
        {messages?.map((message, i) => (
          <Message key={i} from={message.from} text={message.text} />
        ))}
      </Stack>
    );
  }
);

QuestionMessages.displayName = "QuestionMessages";

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
          <QuestionMessages messages={messages} />
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
