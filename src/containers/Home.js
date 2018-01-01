import { connect } from "react-redux";
import actions from "./../actions";

const mapState = (state, props) => {
  const selected = state.feeds.selected;

  return {
    sources: state.feeds.sources,
    feeds: state.feeds.sources[selected].feeds
  };
};

const mapDispatch = (dispatch, props) => {
  return {
    addFeeds: (source, feeds) => dispatch(actions.feeds.addFeeds(source, feeds))
  };
};

export default connect(mapState, mapDispatch);
