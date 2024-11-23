import { ChatMessages } from "@/components/chat/chatMessages";
import { useMessage } from "@/hooks/useMessage";
import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  ClientOnly,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "#/src/components/ui/dialog";

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
      <Box>
        <ClientOnly fallback={<Skeleton />}>
          <ChatMessages question={question} messages={messages} ref={scrollRef} />
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
            <DialogRoot placement="center">
              <DialogTrigger asChild>
                <Button variant="outline">Q</Button>
              </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                  <DialogTitle>Question</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                  <Text>{question?.description ?? ''}</Text>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button>OK</Button>
                  </DialogActionTrigger>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
            <Button type="submit">Submit</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
