import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { admindata } from "../Action/index";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import AdminNav from "./AdminNav";
import Chart from "./Chart";
import ReactLoading from "react-loading";
import Data from "./Data";

export default function Dashboard() {
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
          <>
            <div className="container-fluid">
              <Data />
              <div>
                <h1 className="text-center mt-5">Student Report Chart</h1>
                <Chart data={chartdata} label={chartlabel} />
              </div>
            </div>
          </>
          )
        </>
      )}
    </>
  );
}
