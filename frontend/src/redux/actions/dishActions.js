import { ADD_DISHES, ADD_DISH, DISHES_LOADING, DISHES_FAILED } from "../type";
import axios from "axios";
import { getUrl } from "../../shared/baseUrl";

export const postDish = (newDish) => async (dispatch) => {
  try {
    await axios.post(getUrl("dishes/"), newDish);
    dispatch({ type: ADD_DISH, payload: newDish });
  } catch (error) {
    dispatch({ type: DISHES_FAILED, payload: error.message });
  }
};

export const getDishes = () => async (dispatch) => {
  try {
    dispatch({ type: DISHES_LOADING });
    const res = await axios.get(getUrl("dishes"));
    dispatch({ type: ADD_DISHES, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: DISHES_FAILED, payload: error.message });
  }
};
