import { ADD_FAVORITES, FAVORITES_LOADING, FAVORITES_FAILED } from "../type";

const initialState = {
  isLoading: true,
  errMess: null,
  favorites: null,
};

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        favorites: action.payload,
      };

    case FAVORITES_LOADING:
      return { ...state, isLoading: true, errMess: null, favorites: null };

    case FAVORITES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        favorites: null,
      };

    default:
      return state;
  }
}
