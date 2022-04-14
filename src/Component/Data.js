import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { admindata } from "../Action/index";
import { useDispatch, useSelector } from "react-redux";
import Questions from "../Questions";
export default function Data() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.student.student);
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
  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="container bg-info mx-3 p-5">
          <h1>{admin.length}</h1>
          <h3>Total Students</h3>
        </div>
        <div className="container bg-warning mx-3 p-5">
          <h1>{complete_quiz.length}</h1>
          <h3>Complete Quiz</h3>
        </div>
        <div className="container bg-success mx-3 p-5">
          <h1>{pass_quiz.length}</h1>
          <h3>Pass Students</h3>
        </div>
        <div className="container bg-danger mx-3 p-5">
          <h1>{complete_quiz.length - pass_quiz.length}</h1>
          <h3>Fail Students</h3>
        </div>
      </div>

      <div id="accordion">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Collapsible Group Item #1
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them
              accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
