import { ADD_LEADERS, LEADERS_LOADING, LEADERS_FAILED } from "../type";

const initialState = { isLoading: true, errMess: null, leaders: [] };

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LEADERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        leaders: action.payload,
      };

    case LEADERS_LOADING:
      return { ...state, isLoading: true, errMess: null, leaders: [] };

    case LEADERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
}
