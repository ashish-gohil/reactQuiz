import { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import Loader from "./Loader";
import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";
import "./index.css";
import Error from "./Error";

// run bellow command in saperate terminal in order to start fake API
// json-server --watch .\src\questions.json --port 8000

function App() {
  // useReducer for bellow
  const [isError, setIsError] = useState(false);
  const [isQuestionsLoaded, setIsQuestionsLoaded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  // totalQuestions, totalPoints;
  const totalQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => cur["points"] + prev, 0);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        console.log(res);
        if (!res.ok) throw new Error("Something Went wrong!");
        const data = await res.json();
        console.log(data);
        setIsQuestionsLoaded(true);
        setQuestions(data);
      } catch (err) {
        setIsError(true);
      }
    }
    loadQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {!isQuestionsLoaded && !isError && <Loader />}
        {isError && <Error />}
        {isQuestionsLoaded && !isStarted && (
          <Home
            noOfQuestions={questions.length}
            onStart={() => setIsStarted(true)}
          />
        )}
        {isStarted && !isOver && (
          <Quiz
            totalPoints={totalPoints}
            totalQuestions={totalQuestions}
            questions={questions}
            onFinish={(score) => {
              setScore(score);
              setIsOver(true);
            }}
          />
        )}
        {isOver && (
          <Result
            score={score}
            totalScore={totalPoints}
            onReset={() => {
              setIsOver(false);
              setIsStarted(false);
            }}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
