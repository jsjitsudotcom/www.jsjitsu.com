import React, { PureComponent } from "react";
import { getClick } from "./utils";
import { throttle } from "lodash";

export default class Scroll extends PureComponent {
  play(e) {
    const scrollWidth = e.target.scrollWidth - e.target.offsetWidth;
    const scrollLeft = e.target.scrollLeft;
    
    console.dir(scrollWidth);
    // const audio = new Audio(getClick(3));

  }

  render() {
    return (
      <div onScroll={this.play} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}
