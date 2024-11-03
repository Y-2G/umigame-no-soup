export type QuestionType = {
  id: string;
  title: string;
  description: string;
  answer: string;
};

export type ChatInputType = {
  text: string;
};

export type ChatMessageFromType = "player" | "computer";

export type ChatMessageType = {
  text: string;
  from: ChatMessageFromType;
  createdAt: Date;
  updatedAt: Date;
};
