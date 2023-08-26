import { useEffect, useReducer, useState } from "react";
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
  const initialState = {
    questions: [],
    status: "loading", // loading, error, ready, active, finished
    score: 0,
  };
  function reducer(state, action) {
    switch (action.status) {
      case "error":
        return { ...state, status: "error" };
      case "ready":
        return { ...state, status: "ready", questions: action.payload };
      case "active":
        return { ...state, status: "active" };
      case "finished":
        return { ...state, status: "finished", score: action.payload };
      case "reset":
        return { ...state, status: "ready", score: 0 };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // totalQuestions, totalPoints;
  const totalQuestions = state.questions.length;
  const totalPoints = state.questions.reduce(
    (prev, cur) => cur["points"] + prev,
    0
  );

  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("Something Went wrong!");
        const data = await res.json();
        dispatch({ status: "ready", payload: data });
      } catch (err) {
        dispatch({ status: "error" });
      }
    }
    loadQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <Home
            noOfQuestions={state.questions.length}
            onStart={() => dispatch({ status: "active" })}
          />
        )}
        {state.status === "active" && (
          <Quiz
            totalPoints={totalPoints}
            totalQuestions={totalQuestions}
            questions={state.questions}
            onFinish={(score) => {
              dispatch({ status: "finished", payload: score });
            }}
          />
        )}
        {state.status === "finished" && (
          <Result
            score={state.score}
            totalScore={totalPoints}
            onReset={() => {
              dispatch({ status: "reset" });
            }}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
