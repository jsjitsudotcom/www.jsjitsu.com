import { combineReducers } from "redux";
import { intlReducer as intl } from "react-intl-redux";
import { routerReducer as routing } from "react-router-redux";
import feeds from "./feeds";
import articles from "./articles";
import series from "./series";

const reducers = combineReducers({
  feeds,
  series,
  articles,
  intl,
  routing
});

export default reducers;
