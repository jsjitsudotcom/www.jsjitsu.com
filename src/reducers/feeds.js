import * as constants from "./../constants/feeds";

const initialState = {};

export default function(state = initialState, action) {
  const actions = {
    [constants.onLogout]() {
      return initialState;
    },

    default() {
      return state;
    }
  };

  return (actions[action.type] || actions.default)();
}
