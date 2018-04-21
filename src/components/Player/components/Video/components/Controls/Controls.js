import React, { PureComponent } from "react";
import Style from "./Controls.scss";
import classNames from "classnames";
import Previous from "./../../../../../../assets/icons/video-previous.svg";
import Next from "./../../../../../../assets/icons/video-next.svg";
import Play from "./../../../../../../assets/icons/play.svg";
import Pause from "./../../../../../../assets/icons/pause.svg";

const addInactive = style => isActive =>
  classNames(style, { [Style.inactive]: !isActive });

const isNextInactive = addInactive(Style.next);
const isPreviousInactive = addInactive(Style.previous);

class Controls extends PureComponent {
  render() {
    return (
      <div
        ref={ref => (this.container = ref)}
        className={classNames(Style.container, { hide: !this.props.show })}
      >
        <div className={isPreviousInactive(this.props.hasPrevious)}>
          <img src={Previous} alt="previous" />
        </div>

        {!this.props.isPlaying && (
          <div className={Style.play} onClick={this.props.onPlay}>
            <img src={Play} alt="play" />
          </div>
        )}

        {this.props.isPlaying && (
          <div className={Style.play} onClick={this.props.onPause}>
            <img src={Pause} alt="pause" />
          </div>
        )}

        <div className={isNextInactive(this.props.hasNext)}>
          <img src={Next} alt="next" />
        </div>
      </div>
    );
  }
}

export default Controls;
