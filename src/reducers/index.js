import { combineReducers } from "redux";
import { intlReducer as intl } from "react-intl-redux";
import feeds from "./feeds";

const reducers = combineReducers({
  feeds,
  intl
});

export default reducers;
