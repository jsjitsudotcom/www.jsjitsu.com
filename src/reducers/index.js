import { combineReducers } from "redux";
import { intlReducer as intl } from "react-intl-redux";
import feeds from "./feeds";
import articles from "./articles";

const reducers = combineReducers({
  feeds,
  articles,
  intl
});

export default reducers;
