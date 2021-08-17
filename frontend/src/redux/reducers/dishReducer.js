import { ADD_DISHES, ADD_DISH, DISHES_LOADING, DISHES_FAILED } from "../type";

const initialState = {
  isLoading: true,
  errMess: null,
  dishes: [],
};

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };
    case ADD_DISH:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: [...state.dishes, action.payload],
      };
    case DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };

    case DISHES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dishes: [],
      };

    default:
      return state;
  }
}
