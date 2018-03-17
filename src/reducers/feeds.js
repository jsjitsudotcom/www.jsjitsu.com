import * as constants from "./../constants/feeds";
import { set, view, lensPath, concat, uniqBy, prop } from "ramda";
const initialState = {
  sources: {},
  selected: null
};

const getInitialStateSource = (name, url, options) => ({
  name,
  url,
  feeds: [],
  fetching: false,
  ...options
});

const getLensFeeds = name => lensPath(["sources", name, "feeds"]);
const getLensFeching = name => lensPath(["sources", name, "fetching"]);

export default function(state = initialState, action) {
  const actions = {
    [constants.addSource]() {
      return {
        sources: {
          ...state,
          [action.name]: getInitialStateSource(
            action.name,
            action.url,
            action.options
          )
        }
      };
    },

    [constants.addFeeds]() {
      const lensFeeds = getLensFeeds(action.name);
      const getFeeds = view(lensFeeds, state);
      const concatFeeds = uniqBy(prop("link"), concat(getFeeds, action.feeds));

      return set(lensFeeds, concatFeeds, state);
    },

    [constants.selectSource]() {
      return {
        ...state,
        selected: action.name
      };
    },

    [constants.fetchingSource]() {
      const lensFetching = getLensFeching(action.name);
      return set(lensFetching, true, state);
    },

    [constants.fetchEndSource]() {
      const lensFetching = getLensFeching(action.name);
      return set(lensFetching, false, state);
    },

    default() {
      return state;
    }
  };

  return (actions[action.type] || actions.default)();
}
