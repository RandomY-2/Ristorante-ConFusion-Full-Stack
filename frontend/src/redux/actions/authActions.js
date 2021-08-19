import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../type";
import axios from "axios";
import { getUrl } from "../../shared/baseUrl";

export const loginUser = (creds) => async (dispatch) => {
  try {
    const { username } = creds;
    dispatch({ type: LOGIN_REQUEST, payload: username });

    const response = await axios.post(getUrl("users/login"), creds);
    if (response.data.message === "You have logged in") {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);

      dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
      alert("You have successfully logged in");
      window.location.reload();
    } else {
      var error = new Error("Error " + response.status);
      error.response = response;
      throw error;
    }
  } catch (error) {
    alert("Login Failed: " + error.message);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch({ type: LOGOUT_SUCCESS });
    window.location.reload();
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.messaeg });
  }
};
