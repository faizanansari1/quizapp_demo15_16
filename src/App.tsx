import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import "./App.css";
import QuestionCard from "./Component/QuizCard";
import { getQuizDetails } from "./services/quiz_service";
import { QuestionType } from "./type/quiz_types";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizDetails(5, "easy");
      setQuiz(questions);
      console.log("questions::", questions);
    }
    fetchData();
  }, []);

  const onRestart=()=>{
    setResult(false);
    setCurrentStep(0);
    setScore(0);
  }
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
      setResult(true);
      // setCurrentStep(0);
      // setScore(0);
    }
  };
  if (!quiz.length)
    return (
      <div className="loding">
        {" "}
        <CircularProgress style={{ color: "#515185" }} />
      </div>
    );
  if (result)
    return (
      <div className="App">
        <div className="question-container">
          <h2>Result</h2>
          <p style={{ fontSize: "20px" }}>
            Your Final Score is{" "}
            <span>
              <b>{score}</b>
            </span>{" "}
            Out Of{" "}
            <span>
              <b>{quiz.length}</b>
            </span>
          </p>
          <button className="restart-btn" onClick={onRestart}>Restart</button>
        </div>
      </div>
    );

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
