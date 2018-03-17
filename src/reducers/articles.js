import * as constants from "./../constants/articles";
import { set, view, lensPath, concat, uniqBy, prop } from "ramda";

const initialState = {
  selected: false
};

const getInitialStateArticle = url => ({
  url,
  title: null,
  text: null,
  fetching: false
});

const getLensFetching = url => lensPath([url, "fetching"]);

export default function(state = initialState, action) {
  const actions = {
    [constants.storeArticle]() {
      const { url } = action;

      return {
        ...state,
        [url]: getInitialStateArticle(url)
      };
    },

    [constants.updateArticle]() {
      const { url, ...info } = action;

      return {
        ...state,
        [url]: {
          ...state[url],
          ...info
        }
      };
    },

    [constants.selectArticle]() {
      const { url } = action;

      return {
        ...state,
        selected: url
      };
    },

    [constants.unselectArticle]() {
      return {
        ...state,
        selected: initialState.selected
      };
    },

    [constants.fetching]() {
      const { url } = action;

      return set(getLensFetching(url), true, state);
    },

    [constants.fetchEnd]() {
      const { url } = action;

      return set(getLensFetching(url), false, state);
    },

    default() {
      return state;
    }
  };

  return (actions[action.type] || actions.default)();
}
