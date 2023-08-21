import { useState } from "react";
import Questions from "./Questions";

function Quiz({ questions, onFinish, totalPoints, totalQuestions }) {
  // saperqate useReducer for bellow
  const [curQuestionNo, setCurQuestionNo] = useState(1);
  const [curPoints, setCurPoints] = useState(0);

  const [isOpSelected, setIsOpSelected] = useState(null);
  return (
    <>
      <header className="progress">
        <progress max={totalQuestions} value={curQuestionNo}></progress>
        <p>
          Question <strong>{curQuestionNo}</strong>/{totalQuestions}
        </p>
        <p>
          <strong>{curPoints}</strong>/{totalPoints}
        </p>
      </header>
      <Questions
        question={questions[curQuestionNo - 1]}
        isOpSelected={isOpSelected}
        onOpButtonClick={(op) => {
          console.log(questions[curQuestionNo - 1]["points"]);
          if (op === questions[curQuestionNo - 1]["correctOption"])
            setCurPoints((cur) => cur + questions[curQuestionNo - 1]["points"]);
          setIsOpSelected(op);
        }}
      />
      <footer>
        <div className="timer">01:01</div>
        {isOpSelected !== null && (
          <button
            className="btn btn-ui"
            onClick={() => {
              if (curQuestionNo === questions.length) {
                onFinish(curPoints);
                return;
              }
              setIsOpSelected(null);
              setCurQuestionNo((cur) => cur + 1);
            }}
          >
            {curQuestionNo === questions.length ? "Finish" : "Next"}
          </button>
        )}
      </footer>
    </>
  );
}

export default Quiz;
