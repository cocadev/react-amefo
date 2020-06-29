import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";
import { SERVER_BACKEND_URL } from "../../config";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/auth", data).then(res => {
      if (!res.data.error) {
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        console.log(jwtDecode(token));
        console.log(setCurrentUser(jwtDecode(token)));
        dispatch(setCurrentUser(jwtDecode(token)));
      } else {
        throw new Error({ error: true, msg: "invalid credentials" });
      }
    });
  };
}
