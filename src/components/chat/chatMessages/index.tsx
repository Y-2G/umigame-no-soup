import { ChatMessageType, QuestionType } from "@/types/question";
import { Stack } from "@chakra-ui/react";
import { ForwardedRef, forwardRef } from "react";
import { ChatMessage } from "@/components/chat/chatMessage";

type ChatMessagesProps = {
  question?: QuestionType;
  messages?: ChatMessageType[];
};

export const ChatMessages = forwardRef(
  ({ messages, question }: ChatMessagesProps, ref: ForwardedRef<HTMLDivElement>) => {
    if (!messages || !question) {  
      throw new Promise(() => {}); // Suspenseを待機状態にする
    }
    return (
      <Stack ref={ref} h="full" gap="20px" overflow="scroll" pt="40px" pb="80px">
        <ChatMessage from="computer" text={question.description} />
        {messages?.map((message, i) => (
          <ChatMessage key={i} from={message.from} text={message.text} />
        ))}
      </Stack>
    );
  }
);

ChatMessages.displayName = "ChatMessages";
