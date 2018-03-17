import { connect } from "react-redux";
import actions from "./../actions";

const mapState = (state, props) => {
  const selected = state.feeds.selected;
  const hasSelectedArticle = !!state.articles.selected;
  const selectedArticle =
    hasSelectedArticle && state.articles[state.articles.selected];

  return {
    sources: state.feeds.sources,
    sourcesArray: Object.keys(state.feeds.sources),
    selected,
    selectedArticle,
    feeds: state.feeds.sources[selected].feeds,
    loading: state.feeds.sources[selected].fetching
  };
};

const mapDispatch = (dispatch, props) => {
  return {
    fetchSource: source => dispatch(actions.feeds.fetchSource(source)),
    onClickFeed: url => dispatch(actions.articles.selectArticle(url)),
    onClickBackArticle: () => dispatch(actions.articles.unselectArticle()),
    onFeedMount: url => dispatch(actions.articles.fetchAndStoreArticle(url)),
    selectSource: source => {
      dispatch(actions.feeds.selectSource(source));
      return dispatch(actions.feeds.fetchSource(source));
    }
  };
};

export default connect(mapState, mapDispatch);
