import React, { PureComponent } from "react";
import { getClick } from './utils';

export default class Click extends PureComponent {
  componentDidMount(props) {
    this.sound = getClick(this.props.sound);
  }

  play() {
    const audio = new Audio(this.sound);
    return audio.play();
  }

  render() {
    return <div onClick={() => this.play()}>{this.props.children}</div>;
  }
}
