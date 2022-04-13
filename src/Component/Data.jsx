import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { admindata } from "../Action/index";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import AdminNav from "./AdminNav";
export default function Data() {
  const cookie = Cookies.get("admin");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.student);

  useEffect(() => {
    if (!cookie) {
      navigate("/adminlogin", { replace: true });
    } else {
      dispatch(admindata());
    }
  }, []);
  return (
    <>
      <AdminNav />
      {students.length == 0 ? (
        <>
          <h1 className="text-center">No Data Found</h1>
        </>
      ) : (
        <div className="container-fluid p-5 mt-5">
          <h1 className="text-center mb-3">All Users</h1>
          <hr />
          <table class="table table-dark table-hover border border-dark">
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
              {students.map((ele, i) => {
                return (
                  <>
                    <tr>
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
      )}
    </>
  );
}
