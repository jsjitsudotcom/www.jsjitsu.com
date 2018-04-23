import * as constants from "./../constants/series";

const initialState = {
  series: [],
  isFetching: false
};

export default function(state = initialState, action) {
  const actions = {
    [constants.storeSeries]() {
      return {
        ...state,
        series: action.series
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
