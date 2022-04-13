import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import AdminNav from "./AdminNav";
export default function Admin() {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const admin = (e) => {
    e.preventDefault();
    if (data.email === "ashish@gmail.com" && data.password === "ash123") {
      navigate("/data", { replace: true });
      Cookies.set("admin", "adminlogin");
    } else {
      toast.error("Invalid Logins");
    }
  };
  useEffect(() => {
    const cookie = Cookies.get("admin");
    if (cookie) {
      navigate("/data", { replace: true });
    }
  });
  return (
    <>
    <AdminNav />
      <div className="container p-5 mt-5 bg-warning">
        <form>
          <h1 className="text-center">Login Admin</h1>
          <hr />

          <div className="mb-5">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={data.email}
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={data.password}
              onChange={(e) => setdata({ ...data, password: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-dark fw-bold"
              onClick={admin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
