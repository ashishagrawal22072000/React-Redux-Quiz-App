import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { admindata } from "../Action/index";
import { useDispatch, useSelector } from "react-redux";
import Questions from "../Questions";
import { BsInfoCircleFill } from "react-icons/bs";
import { Accordion } from "react-bootstrap";
export default function Data() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.student.student);
  const [show, setshow] = useState(false);
  console.log(admin);
  useEffect(() => {
    dispatch(admindata());
  }, []);

  const complete_quiz = admin.filter((ele) => {
    return ele.status === "completed";
  });
  const pass_quiz = admin.filter((ele) => {
    return ele.status === "completed" && ele.score >= Questions.length / 2;
  });
  console.log(Questions.length);

  const moreInfo = () => {
    if (show) {
      setshow(false);
    } else {
      setshow(true);
    }
  };

  console.log(show);

  return (
    <>
      <div className="container-fluid d-flex mt-5 justify-content-center">
        <div className="container bg-dark mx-3 p-5 shadow-lg rounded">
          <h1 className="text-light">{admin.length}</h1>
          <h3 className="text-secondary">Total Students</h3>
        </div>
        <div className="container bg-dark mx-3 p-5 shadow-lg rounded">
          <h1 className="text-light">{complete_quiz.length}</h1>
          <h3 className="text-secondary">Complete Quiz</h3>
        </div>
        <div className="container bg-dark mx-3 p-5 shadow-lg rounded">
          <h1 className="text-light">{pass_quiz.length}</h1>
          <h3 className="text-secondary">Pass Students</h3>
        </div>
        <div className="container bg-dark mx-3 p-5 shadow-lg rounded">
          <h1 className="text-light">
            {complete_quiz.length - pass_quiz.length}
          </h1>
          <h3 className="text-secondary">Fail Students</h3>
        </div>
      </div>

      <Accordion
        defaultActiveKey="0"
        className="d-flex justify-content-center mt-3 mb-3 align-items-center outline-none"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header className="text-center">
            More Info <BsInfoCircleFill />
          </Accordion.Header>
          <Accordion.Body>
            <div className="container-fluid p-5 mt-5">
              <h1 className="text-center mb-3">All Students Detail</h1>
              <hr />
              <table className="table table-dark table-hover border border-dark">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Score</th>
                    <th scope="col">Status</th>
                    <th scope="col">Answers</th>
                  </tr>
                </thead>
                <tbody>
                  {admin.map((ele, i) => {
                    return (
                      <>
                        <tr key={i + 1}>
                          <th>{i + 1}</th>
                          <th>{ele.id}</th>
                          <td>{ele.name}</td>
                          <td>{ele.email}</td>
                          <td>{ele.password}</td>
                          <td>{ele.score}</td>
                          <td>{ele.status}</td>
                          <td>{ele.answers}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
