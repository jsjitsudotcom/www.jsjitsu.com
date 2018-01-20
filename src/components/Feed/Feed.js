import React, { PureComponent } from "react";
import Style from "./Feed.scss";
import PropTypes from "prop-types";
import Amplitude from "../../utils/amplitude";

const Loading = ({ delay }) => (
  <div className={Style.loading} style={{ animationDelay: delay + "ms" }} />
);

const logEvent = ({ link, title }) => () =>
  Amplitude.logEvent("FEED_CLICK", {
    link,
    title
  });

export default class Feed extends PureComponent {
  render() {
    return this.props.loading ? (
      <Loading delay={this.props.loadingDelay} />
    ) : (
      <a
        href={this.props.link}
        className={Style.container}
        target="blank"
        onClick={logEvent({
          title: this.props.title,
          link: this.props.link
        })}
      >
        <div className={Style.index}>{this.props.index}</div>
        <div className={Style.title}>{this.props.title}</div>
      </a>
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
