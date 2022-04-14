import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { admindata } from "../Action/index";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import AdminNav from "./AdminNav";
import Chart from "./Chart";
import ReactLoading from "react-loading";
export default function Data() {
  const cookie = Cookies.get("admin");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.student);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if (!cookie) {
      navigate("/adminlogin", { replace: true });
    } else {
      setTimeout(() => {
        dispatch(admindata());
        setloading(false);
      }, 2000);
    }
  }, []);

  const chartdata = students.map((ele) => {
    return ele.score;
  });
  const chartlabel = students.map((ele) => {
    return ele.name;
  });

  return (
    <>
      {loading ? (
        <div className="container p-5 mt-5 d-flex justify-content-center align-items-center">
          <div className="container p-5 mt-5 d-flex justify-content-center align-items-center">
            <ReactLoading type="bars" color="purple" height={200} width={200} />
          </div>
        </div>
      ) : (
        <>
          <AdminNav />

          {students.length === 0 ? (
            <>
              <h1 className="text-center">No Data Found</h1>
            </>
          ) : (
            <>
              <div className="container-fluid p-5 mt-5">
                <h1 className="text-center mb-3">All Users</h1>
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
                    {students.map((ele, i) => {
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
              <div className="container-fluid p-5 mt-5">
                <h1 className="text-center">Students Report</h1>
                <hr />
                <Chart data={chartdata} label={chartlabel} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
