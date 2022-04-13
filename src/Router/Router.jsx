import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Component/Home";
import Register from "../Component/Register";
import Login from "../Component/Login";
import Admin from "../Component/Admin";
import Data from "../Component/Data";
import Quizz from "../Component/Quizz";
import Error from "../Component/Error";
export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studentlogin" element={<Login />} />
          <Route path="/studentregister" element={<Register />} />
          <Route path="/adminlogin" element={<Admin />} />
          <Route path="/data" element={<Data />} />
          <Route path="/quizz" element={<Quizz />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
