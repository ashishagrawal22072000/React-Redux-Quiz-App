import React, { useState, useEffect } from "react";
import Questions from "../Questions";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { login, studentscore } from "../Action";
import { useSelector, useDispatch } from "react-redux";
import StudentNav from "./StudentNav";
import { toast } from "react-toastify";
export default function Quizz() {
  const navigate = useNavigate();
  const cookie = Cookies.get("student");
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.student);
  useEffect(() => {
    if (!cookie) {
      toast.error("Please Login First");
      navigate("/studentlogin", { replace: true });
    } else {
      dispatch(login());
    }
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [saveans, setsaveans] = useState([]);

  const handleAnswerOptionClick = (isCorrect, text) => {
    setsaveans([...saveans, text]);
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const save = () => {
    const confirm = window.confirm("Are You Sure To Want To Save  ");
    const activeuser = student.filter((ele) => {
      return ele.id == cookie;
    });
    if (confirm && activeuser.length > 0) {
      dispatch(
        studentscore(cookie, {
          ...activeuser[0],
          score: score,
          status: "completed",
          answers: saveans,
        })
      );
      toast.success("Scores Saved Successfully");
    }
  };
  const playAgain = () => {
    window.location.reload();
  };
  return (
    <>
      <StudentNav />
      <div className="container">
        {showScore ? (
          <div className="score-section container p-5 mt-5 bg-warning">
            <h1 className="text-center">
              You scored{" "}
              <span
                className={`${
                  score >= Questions.length / 2 ? "text-success" : "text-danger"
                }`}
              >
                {score}
              </span>{" "}
              out of {Questions.length}
            </h1>
            <div className="container d-flex mt-5 justify-content-center align-items-center">
              <button className="btn btn-dark fw-bold mx-5" onClick={playAgain}>
                Play Again
              </button>
              <button className="btn btn-dark fw-bold" onClick={save}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="container p-5 mt-5 bg-warning ">
              <h1 className="text-center">Quizz App</h1>
              <hr />
              <div className="question-count mt-5">
                <span className="fw-bold text-muted">
                  Question {currentQuestion + 1} of {Questions.length}
                </span>
              </div>
              <div className="question-text mt-3">
                <h2 className="fw-bold">
                  {Questions[currentQuestion].question}
                </h2>
              </div>
              <div className="container d-flex flex-column justify-content-center align-items-start">
                {Questions[currentQuestion].options.map((answerOption) => {
                  return (
                    <>
                      <button
                        className="btn btn-dark mt-5 fw-bold "
                        style={{ width: "200px", height: "50px" }}
                        onClick={() =>
                          handleAnswerOptionClick(
                            answerOption.isCorrect,
                            answerOption.answerText
                          )
                        }
                      >
                        {answerOption.answerText}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
