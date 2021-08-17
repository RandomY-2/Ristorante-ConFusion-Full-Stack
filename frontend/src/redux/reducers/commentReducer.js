import { ADD_COMMENT, ADD_COMMENTS, COMMENTS_FAILED } from "../type";

const initialState = {
  errMess: null,
  comments: [],
};

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload,
      };

    case COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: [],
      };

    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };

    default:
      return state;
  }
}
