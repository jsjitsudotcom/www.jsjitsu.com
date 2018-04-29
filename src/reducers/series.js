import * as constants from "./../constants/series";

const initialState = {
  series: [],
  episodes: [],
  episode: {},
  isFetching: false
};

/*
const initialState = {
  offline: {
    
  },
  series: {
    "4567": {
      id: "4567",
      title: "23456",
      description: "3456789",
      episodes: ["23456"]
    }
  },
  sections: {
    entities: {
      id: "23456",
      title: "234567",
      description: "2345678",
      series: ["23456", "5678"],
      fetching: false,
      error: false
    },
    ids: ["23456", "876"]
  },
  episodes: {

  },
  serie: null,
  episode: null,
  player: {
    playing: false,
    next: "4567",
    previous: "3456"
  },
  isFetching: false
};
*/

export default function(state = initialState, action) {
  const actions = {
    [constants.storeSeries]() {
      return {
        ...state,
        series: action.series
      };
    },

    [constants.storeEpisodes]() {
      return {
        ...state,
        episodes: action.episodes,
        episode: action.episodes[0]
      };
    },

    [constants.fetching]() {
      return {
        ...state,
        isFetching: true
      };
    },

    [constants.fetchEnd]() {
      return {
        ...state,
        isFetching: false
      };
    },

    default() {
      return state;
    }
  };

  return (actions[action.type] || actions.default)();
}
