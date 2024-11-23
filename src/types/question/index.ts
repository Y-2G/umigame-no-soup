export type QuestionType = {
  id: string;
  title: string;
  description: string;
  answer: string;
};

export type ChatInputType = {
  text: string;
};

export type ChatMessageType = {
  text: string;
  from: string;
  createdAt: Date;
  updatedAt: Date;
};
