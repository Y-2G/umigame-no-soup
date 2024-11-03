import { ChatMessageType } from "@/types/question";
import { Stack } from "@chakra-ui/react";
import { ForwardedRef, forwardRef } from "react";
import { ChatMessage } from "@/components/chat/chatMessage";

type ChatMessagesProps = {
  messages?: ChatMessageType[];
};

export const ChatMessages = forwardRef(
  ({ messages }: ChatMessagesProps, ref: ForwardedRef<HTMLDivElement>) => {
    if (!messages) {
      throw new Promise(() => {}); // Suspenseを待機状態にする
    }
    return (
      <Stack ref={ref} h="100%" overflow="scroll">
        {messages?.map((message, i) => (
          <ChatMessage key={i} from={message.from} text={message.text} />
        ))}
      </Stack>
    );
  }
);

ChatMessages.displayName = "ChatMessages";
