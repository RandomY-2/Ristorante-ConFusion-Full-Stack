import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  MAKE_ADMIN,
} from "../type";

const initialState = {
  isLoading: false,
  isAdmin: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  user: localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "",
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
        user: "",
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
    case MAKE_ADMIN:
      return {
        ...state,
        isAdmin: true,
      };
    default:
      return state;
  }
}
