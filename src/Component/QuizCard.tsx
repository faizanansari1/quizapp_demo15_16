import React, { useState } from "react";
import { QuestionPropsType } from "./../type/quiz_types";

const QuestionCard: React.FC<QuestionPropsType> = ({
  options,
  question,
  callback,
}) => {
  // console.log("1", options, "2", question);

  let [selectedAns, setSelectedAns] = useState("");
  const handleSelection = (ev:any) => {
    console.log(ev.target.value);
    setSelectedAns(ev.target.value);
  };

  return (
    <div className="question-container">
      <div className="question">{question}</div>
      <form onSubmit={(e:React.FormEvent<EventTarget>) =>callback(e, selectedAns)}>
        {options.map((opt: string, ind: number) => {
          return (
            <div key={ind}>
              <label>
                <input
                required
                  type="radio"
                  name="opt"
                  value={opt}
                  checked={selectedAns === opt}
                  onChange={handleSelection}
                />
                {opt}
              </label>
            </div>
          );
        })}
        <input type="submit" />
      </form>
    </div>
  );
};

export default QuestionCard;
