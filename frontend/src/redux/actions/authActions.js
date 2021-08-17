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
    const { username, password } = creds;
    dispatch({ type: LOGIN_REQUEST, payload: { username, password } });

    const response = await axios.post(getUrl("users/login"), {
      username,
      password,
    });

    if (response.success) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("creds", { username, password });

      // dispatch(fetchFavorites());
      dispatch({ type: LOGIN_SUCCESS, payload: response.token });
    } else {
      var error = new Error("Error " + response.status);
      error.response = response;
      throw error;
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    localStorage.removeItem("token");
    localStorage.removeItem("creds");
    dispatch({ type: LOGOUT_SUCCESS });
    window.location.reload();
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.messaeg });
  }
};
