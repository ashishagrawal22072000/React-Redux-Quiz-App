import React, { useState, useEffect } from "react";
import Questions from "../Questions";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { login, studentscore, admindata } from "../Action/index";
import { useSelector, useDispatch } from "react-redux";
import StudentNav from "./StudentNav";
import { toast } from "react-toastify";
export default function Quizz() {
  const navigate = useNavigate();
  const cookie = Cookies.get("student");

  const [complete, setcomplete] = useState(false);
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.student);
  const admin = useSelector((state) => state.student.student);
  useEffect(() => {
    if (!cookie) {
      toast.error("Please Login First");
      navigate("/studentlogin", { replace: true });
    } else {
      dispatch(login());
      dispatch(admindata());
    }
  }, []);
  useEffect(() => {
    const stu_cmp = admin.filter((ele) => {
      return ele.id == cookie && ele.status === "completed";
    });

    if (stu_cmp.length > 0) {
      setcomplete(true);
      Cookies.remove("student");
    }
  }, []);

  const [counter, setcounter] = useState(59);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setcounter(counter - 1), 500);
    return () => clearInterval(timer);
  }, [counter]);

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
    const confirm = window.confirm("Are You Sure To Want To Exit");
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
      Cookies.remove("student");
      navigate("/studentlogin", { replace: true });
    }
  };

  useEffect(() => {
    if (counter === 0) {
      toast.error("Sorry ! Your Time Is Up");
      setShowScore(true);
    }
  }, [counter]);
  return (
    <>
      <StudentNav />
      <div className="container">
        {showScore ? (
          <div className="score-section container p-5 mt-5 bg-dark">
            <div className="container p-5 mt-5">
              <h1 className="text-center text-light">
                You scored{" "}
                <span
                  className={`${
                    score >= Questions.length / 2
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {score}
                </span>{" "}
                out of {Questions.length}
              </h1>
              <div className="container d-flex mt-5 justify-content-center align-items-center">
                <button className="btn btn-light fw-bold" onClick={save}>
                  Exit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {complete ? (
              <div className="container p-5 mt-5 d-flex justify-content-center align-items-center">
                <div className="container p-5 mt-5 d-flex justify-content-center align-items-center">
                  <h1 className="text-center">
                    You Already Complete Your Quiz
                  </h1>
                </div>
              </div>
            ) : (
              <div className="container p-5 mt-5 bg-dark ">
                <h1 className="text-center text-light">Quizz App</h1>
                <hr />
                <div className="question-count mt-5 d-flex justify-content-between">
                  <h4 className="fw-bold text-light">
                    Question {currentQuestion + 1} of {Questions.length}
                  </h4>
                  <h4
                    className={`${
                      counter <= 10 ? "text-danger" : "text-light"
                    } text-center`}
                  >
                    00:
                    <span className={`${counter < 10 ? "d-inline" : "d-none"}`}>
                      0
                    </span>
                    {counter}
                  </h4>
                </div>
                <div className="question-text mt-3">
                  <h2 className="fw-bold text-light">
                    {Questions[currentQuestion].question}
                  </h2>
                </div>
                <div className="container d-flex flex-column justify-content-center align-items-start">
                  {Questions[currentQuestion].options.map((answerOption) => {
                    return (
                      <>
                        <button
                          className="btn btn-light mt-5 fw-bold "
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
            )}
          </>
        )}
      </div>
    </>
  );
}
