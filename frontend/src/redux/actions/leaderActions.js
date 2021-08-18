import {
  ADD_LEADERS,
  ADD_LEADER,
  LEADERS_LOADING,
  LEADERS_FAILED,
} from "../type";
import axios from "axios";
import { getUrl } from "../../shared/baseUrl";

export const getLeaders = () => async (dispatch) => {
  try {
    dispatch({ type: LEADERS_LOADING });
    const res = await axios.get(getUrl("leaders"));
    dispatch({ type: ADD_LEADERS, payload: res.data });
  } catch (error) {
    dispatch({ type: LEADERS_FAILED, payload: error.message });
  }
};

export const addLeader = (newLeader) => async (dispatch) => {
  try {
    const res = await axios.post(getUrl("leaders"), newLeader);
    dispatch({ type: ADD_LEADER, payload: newLeader });
  } catch (error) {
    dispatch({ type: LEADERS_FAILED, payload: error.message });
  }
};
