"use client";

import { Question } from "@/types/question";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Dispatch, SetStateAction, createContext, useState } from "react";

const defaultQuestionValue: QuestionContextType = {
  question: null,
  setQuestion: () => {},
};
type QuestionContextType = {
  question: Question | null;
  setQuestion: Dispatch<SetStateAction<Question | null>>;
};

export const QuestionContext = createContext(defaultQuestionValue);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [question, setQuestion] = useState<Question | null>(null);

  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%" }}>
        <ChakraProvider>
          <QuestionContext.Provider value={{ question, setQuestion }}>
            <main style={{ height: "100%" }}>{children}</main>
          </QuestionContext.Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
