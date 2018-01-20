import React, { PureComponent } from "react";
import Style from "./Feed.scss";
import Click from "./../Sound/Click";

export default class Feed extends PureComponent {
  render() {
    return (
      <Click sound={3}>
        <a href={this.props.link} className={Style.container} target="blank">
          <div className={Style.index}>{this.props.index}</div>
          <div className={Style.title}>{this.props.title}</div>
        </a>
      </Click>
    );
  }
}

Feed.propTypes = {};

Feed.defaultProps = {
  title: "Introducing Hyperapp 1.0 - 1KB Javascipt Application",
  index: "1",
  link: "#"
};
