import { connect } from "react-redux";
import actions from "./../../../actions";

const mapState = (state, props) => {
  return {
    series: state.series.series
  };
};

const mapDispatch = (dispatch, props) => ({
  fetchSeries: () => dispatch(actions.series.fetchSeries())
});

export default connect(mapState, mapDispatch);
