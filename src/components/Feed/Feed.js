import React, { PureComponent } from "react";
import Style from "./Feed.scss";
import Click from "./../Sound/Click";
import PropTypes from "prop-types";

const Loading = ({ delay }) => (
  <div className={Style.loading} style={{ animationDelay: delay + "ms" }} />
);

export default class Feed extends PureComponent {
  render() {
    return this.props.loading ? (
      <Loading delay={this.props.loadingDelay} />
    ) : (
      <Click sound={3}>
        <a href={this.props.link} className={Style.container} target="blank">
          <div className={Style.index}>{this.props.index}</div>
          <div className={Style.title}>{this.props.title}</div>
        </a>
      </Click>
    );
  }
}

Feed.propTypes = {
  title: PropTypes.string,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  link: PropTypes.string,
  loading: PropTypes.bool,
  loadingDelay: PropTypes.number
};

Feed.defaultProps = {
  title: "Introducing Hyperapp 1.0 - 1KB Javascipt Application",
  index: "1",
  link: "#",
  loading: false,
  loadingDelay: 0
};
