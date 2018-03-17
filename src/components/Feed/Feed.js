import React, { PureComponent } from "react";
import Style from "./Feed.scss";
import PropTypes from "prop-types";

const Loading = ({ delay }) => (
  <div className={Style.loading} style={{ animationDelay: delay + "ms" }} />
);

export default class Feed extends PureComponent {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return this.props.loading ? (
      <Loading delay={this.props.loadingDelay} />
    ) : (
      <div onClick={this.props.onClick} className={Style.container}>
        <div className={Style.index}>{this.props.index}</div>
        <div className={Style.title}>{this.props.title}</div>
      </div>
    );
  }
}

Feed.propTypes = {
  title: PropTypes.string,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  link: PropTypes.string,
  loading: PropTypes.bool,
  loadingDelay: PropTypes.number,
  onMount: PropTypes.func,
  onClick: PropTypes.func
};

Feed.defaultProps = {
  title: "Introducing Hyperapp 1.0 - 1KB Javascipt Application",
  index: "1",
  link: "#",
  loading: false,
  loadingDelay: 0,
  onMount: /* istanbul ignore next */ () =>
    console.warn("defaultProps: Feed.onMount()"),
  onClick: /* istanbul ignore next */ () =>
    console.warn("defaultProps: Feed.onClick()")
};
