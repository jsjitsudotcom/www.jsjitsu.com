import { connect } from "react-redux";
import { push } from "react-router-redux";
import actions from "./../../../actions";

const mapState = (state, props) => {
  const { title, illustration, description, source } = state.series.episode;
  return {
    episodes: state.series.episodes,
    title,
    illustration,
    description,
    source
  };
};

const mapDispatch = (dispatch, props) => ({
  onBack: id => dispatch(push(`/`)),
  onMount: id => dispatch(actions.series.fetchEpisodes(id))
});

export default connect(mapState, mapDispatch);
