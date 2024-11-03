import { QuestionType } from "@/types/question";
import { Text } from "@chakra-ui/react";

type Props = {
  question?: QuestionType;
};

export const QuestionDescription = ({ question }: Props) => {
  if (!question?.description) {
    throw new Promise(() => {}); // Suspenseを待機状態にする
  }
  return <Text>{question.description}</Text>;
};
