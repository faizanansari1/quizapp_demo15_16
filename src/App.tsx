import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import "./App.css";
import QuestionCard from "./Component/QuizCard";
import { getQuizDetails } from "./services/quiz_service";
import { QuestionType } from "./type/quiz_types";

function App() {
  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizDetails(5, "easy");
      setQuiz(questions);
      console.log("questions::", questions);
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: QuestionType = quiz[currentStep];

    console.log(
      "CORRECTANSWER::" +
        currentQuestion.correct_answer +
        "USERSELECTION::" +
        userAns
    );
    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }
    if (currentStep !== quiz.length - 1) setCurrentStep(++currentStep);
    else {
      alert("Your Final Score is : " + score + " Out Of : " + quiz.length);
      setCurrentStep(0);
      setScore(0);
    }
  };
  if (!quiz.length) return <h2>Loading...</h2>;
  return (
    <div className="App">
      <QuestionCard
        options={quiz[currentStep].option}
        question={quiz[currentStep].quesyion}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
