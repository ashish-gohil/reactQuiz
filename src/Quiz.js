import { useEffect, useState } from "react";
import Questions from "./Questions";
import Timer from "./Timer";

function Quiz({ questions, onFinish, totalPoints, totalQuestions }) {
  // saperqate useReducer for bellow
  const [curQuestionNo, setCurQuestionNo] = useState(1);
  const [curPoints, setCurPoints] = useState(0);
  const [isOpSelected, setIsOpSelected] = useState(null);
  const finishQuiz = () => {
    onFinish(curPoints);
  };

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
        <Timer onFinish={finishQuiz} />
        {isOpSelected !== null && (
          <button
            className="btn btn-ui"
            onClick={() => {
              if (curQuestionNo === questions.length) {
                finishQuiz();
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
