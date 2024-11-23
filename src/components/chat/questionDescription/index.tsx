import { QuestionType } from "@/types/question";
import { ChatMessage } from "../chatMessage";

type Props = {
  question?: QuestionType;
};

export const QuestionDescription = ({ question }: Props) => {
  if (!question?.description) {
    throw new Promise(() => {}); // Suspenseを待機状態にする
  }
  return (
    <ChatMessage from="computer" text={question.description} />

    // <Center px="20px" py="10px" h="48px" backgroundColor="gray.100" borderRadius="calc(0.5 * 48px)">
    //   <Text textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">{question.description}</Text>
    // </Center>
  );
};
  