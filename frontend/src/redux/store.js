import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./reducers/authReducer";
import commentReducer from "./reducers/commentReducer";
import dishReducer from "./reducers/dishReducer";
import leaderReducer from "./reducers/leaderReducer";
import promoReducer from "./reducers/promoReducer";
import feedbackReducer from "./reducers/feedbackReducer";

const reducer = combineReducers({
  auth: authReducer,
  comment: commentReducer,
  dish: dishReducer,
  leader: leaderReducer,
  promotion: promoReducer,
  feedback: feedbackReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
