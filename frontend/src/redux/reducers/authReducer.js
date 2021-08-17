import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../type";

const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  user: localStorage.getItem("creds")
    ? JSON.parse(localStorage.getItem("creds"))
    : null,
  errMess: null,
};

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: "",
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.payload,
      };
    case LOGOUT_REQUEST:
      return { ...state, isLoading: true, isAuthenticated: true };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: "",
        user: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: action.payload,
      };
    default:
      return state;
  }
}
