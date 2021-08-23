import axios from "axios";
import { getUrl } from "../../shared/baseUrl";
import { GET_FEEDBACKS, ADD_FEEDBACK, FEEDBACK_FAILED } from "../type";

export const getFeedbacks = () => async (dispatch) => {
  try {
    const res = await axios.get(getUrl("feedbacks"));
    dispatch({ type: GET_FEEDBACKS, payload: res.data });
  } catch (error) {
    dispatch({ type: FEEDBACK_FAILED, payload: error.message });
  }
};

export const postFeedback = (newFeedback) => async (dispatch) => {
  try {
    const res = await axios.post(getUrl("feedbacks"), newFeedback);
    dispatch({ type: ADD_FEEDBACK, payload: newFeedback });
    alert("We have received your feedback!");
  } catch (error) {
    dispatch({ type: FEEDBACK_FAILED, payload: error.message });
  }
};
