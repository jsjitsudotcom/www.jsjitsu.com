import { connect } from "react-redux";
import actions from "./../actions";

const mapState = (state, props) => {
  const selected = state.feeds.selected;

  return {
    sources: state.feeds.sources,
    sourcesArray: Object.keys(state.feeds.sources),
    selected,
    feeds: state.feeds.sources[selected].feeds,
    loading: state.feeds.sources[selected].fetching
  };
};

const mapDispatch = (dispatch, props) => {
  return {
    addFeeds: (source, feeds) =>
      dispatch(actions.feeds.addFeeds(source, feeds)),
    fetchSource: source => dispatch(actions.feeds.fetchSource(source)),
    selectSource: source => {
      dispatch(actions.feeds.selectSource(source));
      return dispatch(actions.feeds.fetchSource(source));
    }
  };
};

export default connect(mapState, mapDispatch);
