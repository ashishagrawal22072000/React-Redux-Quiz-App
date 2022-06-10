import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, login } from "../Action";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentNav from "./StudentNav";
import RegisterImage from "../Images/register.jpg";
export default function Register() {
  const emialregex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) => state.student.student);
  const [datas, setdatas] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(login());
  }, []);
  const registerStudent = (e) => {
    e.preventDefault();
    const present = student.some((ele) => {
      return ele.email === datas.email;
    });

    if (datas.name === "" || datas.email === "" || datas.password === "") {
      toast.warn("Please Enter All The Required Fields");
    } else if (!emialregex.test(datas.email)) {
      toast.warn("Invalid Email");
    } else if (present) {
      toast.warn("User Already Exist");
    } else if (!passregex.test(datas.password)) {
      toast.warn(
        "Password must contain Minimum eight characters, at least one letter, one number and one special character:"
      );
    } else {
      dispatch(
        register({
          ...datas,
          id: Date.now(),
        })
      );
      setdatas({
        id: "",
        name: "",
        email: "",
        password: "",
      });

      navigate("/studentlogin", { replace: true });
    }
  };
  return (
    <>
      <StudentNav />
      <div className="container mt-5 d-flex justify-content-center ">
        <div className="container bg-success p-5">
          <form>
            <h1 className="text-center">Register Yourself</h1>
            <hr />
            <div className="mb-5">
              <label htmlFor="name" className="form-label fw-bold">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                autoComplete="off"
                value={datas.name}
                onChange={(e) => setdatas({ ...datas, name: e.target.value })}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="form-label fw-bold">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                autoComplete="off"
                value={datas.email}
                onChange={(e) => setdatas({ ...datas, email: e.target.value })}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={datas.password}
                onChange={(e) =>
                  setdatas({ ...datas, password: e.target.value })
                }
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-dark fw-bold"
                onClick={registerStudent}
              >
                Register
              </button>
            </div>
            <p className="text-center mt-3">
              Already Have An Account ?{" "}
              <Link to="/studentlogin" className="fw-bold text-dark">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="container border">
          <img src={RegisterImage} height="100%" width="100%" />
        </div>
      </div>
    </>
  );
}
