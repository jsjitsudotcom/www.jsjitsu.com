import React, { PureComponent } from "react";
import Style from "./Feed.scss";

export default class Feed extends PureComponent {
  render() {
    const readedStyle = this.props.readed ? Style.readed : "";
    const containerStyle = `${Style.container} ${readedStyle}`;

    return (
      <a href={this.props.link} className={containerStyle} target="blank">
        <div className={Style.index}>{this.props.index}</div>
        <div className={Style.title}>{this.props.title}</div>
      </a>
    );
  }
}

Feed.propTypes = {};

Feed.defaultProps = {
  title: "Introducing Hyperapp 1.0 - 1KB Javascipt Application",
  index: "1",
  link: "#",
  readed: false
};
