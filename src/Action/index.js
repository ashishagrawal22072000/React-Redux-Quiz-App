import axios from "axios";
import {
  LOGIN_STUDENT,
  REGISTER_STUDENT,
  SCORE_STUDENT,
  ADMIN_DATA,
  STUDENT_REPORT
} from "./actionType";

export const register = (student) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: `http://localhost:${process.env.REACT_APP_PORT}/students`,
      data: student,
    })
      .then((res) => {
        dispatch({
          type: REGISTER_STUDENT,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const login = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `http://localhost:${process.env.REACT_APP_PORT}/students`,
    })
      .then((res) => {
        dispatch({
          type: LOGIN_STUDENT,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const studentscore = (id, data) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: `http://localhost:${process.env.REACT_APP_PORT}/students/${id}`,
      data: data,
    })
      .then((res) => {
        dispatch({
          type: SCORE_STUDENT,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const admindata = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `http://localhost:${process.env.REACT_APP_PORT}/students`,
    })
      .then((res) => {
        dispatch({
          type: ADMIN_DATA,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const studentreport = (id) =>{
  return (dispatch) => {
    axios({
      method: "GET",
      url: `http://localhost:${process.env.REACT_APP_PORT}/students/${id}`,
    })
      .then((res) => {
        dispatch({
          type: STUDENT_REPORT,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}