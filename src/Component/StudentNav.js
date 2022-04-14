import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function StudentNav() {
  const cookie = Cookies.get("student");

  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("student");
    navigate("/studentlogin", { replace: true });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-Navbarbrand" to="/">
            Quizz.com
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/quizz"
                >
                  Home
                </Link>
              </li>
            </ul>
            <div className={`${cookie ? "d-block" : "d-none"}`}>
              <button className="btn btn-dark" onClick={logout}>
                LogOut
              </button>
            </div>
            <div className={`${cookie ? "d-none" : "d-block"}`}>
              <button className="btn btn-dark mx-3">
                <Link to="/studentlogin">Login</Link>
              </button>
              <button className="btn btn-dark">
                <Link to="/studentregister">Register</Link>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
