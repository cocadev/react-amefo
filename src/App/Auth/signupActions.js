import axios from "axios";
import { SERVER_BACKEND_URL } from "../../config";

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/auth/register", userData);
  };
}
