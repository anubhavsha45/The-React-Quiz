import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import Startscreen from "./Startscreen";
import Question from "./Question";
import Nextquestion from "./Nextquestion";
import Progress from "./Progress";
import Finishedstate from "./Finishedstate";
import Timer from "./Timer";
import Footer from "./Footer";
import Email from "./Email";
import Difficulty from "./Diffculty";
const SECS_PER_QUES = 30;
const initialstate = {
  email: null,
  name: "",
  hasemail: false,
  choosingphase: false,
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "emailphase":
      return { ...state, email: action.payload };
    case "email": {
      const email = state.email;

      const isValid =
        email.includes("@") && email.includes(".") && email.length > 5;

      if (!isValid) {
        return state;
      }

      return { ...state, hasemail: true };
    }
    case "name":
      return { ...state, name: action.payload };
    case "datarecieved":
      return { ...state, questions: action.payload, status: "Ready" };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUES,
        name: "",
        choosingphase: true,
      };
    case "newanswer":
      const question = state.questions[state.index];
      const isCorrect = action.payload === question.correctOption;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    case "nextquestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        status: "Ready",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: state.questions.length * SECS_PER_QUES,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    case "easy": {
      const oldquestions = state.questions;
      const newquestions = oldquestions.filter(
        (question) => question.difficulty === "easy",
      );
      return { ...state, questions: newquestions, choosingphase: false };
    }
    case "medium": {
      const oldquestions = state.questions;
      const newquestions = oldquestions.filter(
        (question) => question.difficulty === "medium",
      );
      return { ...state, questions: newquestions, choosingphase: false };
    }
    case "hard": {
      const oldquestions = state.questions;
      const newquestions = oldquestions.filter(
        (question) => question.difficulty === "hard",
      );
      return { ...state, questions: newquestions, choosingphase: false };
    }
    default:
      throw new Error("unkown");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const {
    email,
    name,
    hasemail,
    choosingphase,
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  console.log(questions[0]);
  const numLength = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0,
  );
  useEffect(() => {
    const storedUser = localStorage.getItem("reactQuizUser");
    if (!storedUser) return;

    const parsed = JSON.parse(storedUser);

    dispatch({ type: "emailphase", payload: parsed.email });
    dispatch({ type: "name", payload: parsed.name });
    dispatch({ type: "email" });
  }, []);
  useEffect(() => {
    if (!hasemail) return;

    const user = {
      email,
      name,
      highscore,
    };

    localStorage.setItem("reactQuizUser", JSON.stringify(user));
  }, [email, name, highscore, hasemail]);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "datarecieved", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);
  return (
    <div className="app">
      {!hasemail ? (
        <Email dispatch={dispatch} />
      ) : (
        <>
          <Header name={name} />
          {choosingphase === true ? (
            <Difficulty dispatch={dispatch} />
          ) : (
            <Main>
              {status === "loading" && <Loader />}
              {status === "error" && <Error />}
              {status === "Ready" && (
                <Startscreen numLength={numLength} dispatch={dispatch} />
              )}
              {status === "active" && (
                <>
                  <Progress
                    index={index}
                    numquestions={numLength}
                    points={points}
                    maxPossiblePoints={maxPossiblePoints}
                    answer={answer}
                  />
                  <Question
                    questions={questions[index]}
                    dispatch={dispatch}
                    answer={answer}
                  />
                  <Footer>
                    <Timer
                      secondsRemaining={secondsRemaining}
                      dispatch={dispatch}
                    />
                    <Nextquestion
                      answer={answer}
                      dispatch={dispatch}
                      index={index}
                      numLength={numLength}
                    />
                  </Footer>
                </>
              )}
              {status === "finish" && (
                <Finishedstate
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  highscore={highscore}
                  dispatch={dispatch}
                />
              )}
            </Main>
          )}
        </>
      )}
    </div>
  );
}
