import { connect } from "react-redux";
import actions from "./../../../actions";
import { push } from "react-router-redux";

const mapState = (state, props) => {
  return {
    series: state.series.series
  };
};

const mapDispatch = (dispatch, props) => ({
  fetchSeries: () => dispatch(actions.series.fetchSeries()),
  onClickSerie: id => dispatch(push(`/series/${id}`))
});

export default connect(mapState, mapDispatch);
