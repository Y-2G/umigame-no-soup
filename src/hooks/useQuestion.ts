import { useEffect, useState } from "react";
import { db } from "#/firebaseConfig";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { QuestionType } from "@/types/question";

export const useQuestion = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const handleClick = (question: QuestionType) => {
    queryClient.setQueryData<QuestionType>(["select-quesiton"], {
      ...question,
    });
  };
  useEffect(() => {
    const q = query(collection(db, "question"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questions = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setQuestions(questions);
    });
    return () => unsubscribe();
  }, []);

  return {
    questions,
    handleClick,
  };
};
