import { ADD_PROMOS, ADD_PROMO, PROMOS_LOADING, PROMOS_FAILED } from "../type";
import axios from "axios";
import { getUrl } from "../../shared/baseUrl";

export const getPromotions = () => async (dispatch) => {
  try {
    dispatch({ type: PROMOS_LOADING });
    const res = await axios.get(getUrl("promotions"));
    dispatch({ type: ADD_PROMOS, payload: res.data });
  } catch (error) {
    dispatch({ type: PROMOS_FAILED, payload: error.message });
  }
};

export const addPromotion = (newPromotion) => async (dispatch) => {
  try {
    const res = await axios.post(getUrl("promotions"), newPromotion);
    dispatch({ type: ADD_PROMO, payload: newPromotion });
  } catch (error) {
    dispatch({ type: PROMOS_FAILED, payload: error.message });
  }
};
