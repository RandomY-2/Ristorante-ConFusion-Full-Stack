import { GET_FEEDBACKS, ADD_FEEDBACK, FEEDBACK_FAILED } from "../type";

const initialState = {
  feedbacks: [],
  errMess: "",
};

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEEDBACKS:
      return {
        ...state,
        feedbacks: action.payload,
      };

    case ADD_FEEDBACK:
      return {
        ...state,
        feedbacks: [...state.feedbacks, action.payload],
      };

    case FEEDBACK_FAILED:
      return {
        ...state,
        errMess: action.payload,
      };

    default:
      return state;
  }
}
