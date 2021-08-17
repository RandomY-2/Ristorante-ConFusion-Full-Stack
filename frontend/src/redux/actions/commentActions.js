import { ADD_COMMENT, ADD_COMMENTS, COMMENTS_FAILED } from "../type";
import axios from "axios";
import { getUrl } from "../../shared/baseUrl";

export const addComment = (dishId, newComment) => async (dispatch) => {
  try {
    await axios.post(getUrl(`dishes/${dishId}/comments`), newComment);
    dispatch({ type: ADD_COMMENT, payload: newComment });
  } catch (error) {
    dispatch({ type: COMMENTS_FAILED, payload: error.message });
  }
};

export const getComments = (dishId) => async (dispatch) => {
  try {
    const res = await axios.get(getUrl(`dishes/${dishId}/comments`));
    dispatch({ type: ADD_COMMENTS, payload: res.data });
  } catch (error) {
    dispatch({ type: COMMENTS_FAILED, payload: error.message });
  }
};
