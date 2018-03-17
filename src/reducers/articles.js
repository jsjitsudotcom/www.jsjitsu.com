import * as constants from "./../constants/articles";
import { set, view, lensPath, concat, uniqBy, prop } from "ramda";

const initialState = {};

const getInitialStateArticle = ({ url, text, title }) => ({
  url,
  title,
  text,
  fetching: false
});

export default function(state = initialState, action) {
  const actions = {
    [constants.storeArticle]() {
      const { url, text, title } = action;

      return {
        ...state,
        [url]: getInitialStateArticle({
          url,
          text,
          title
        })
      };
    },

    default() {
      return state;
    }
  };

  return (actions[action.type] || actions.default)();
}
