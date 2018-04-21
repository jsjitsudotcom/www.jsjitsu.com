import React, { PureComponent } from "react";
import Style from "./Progress.scss";
import FullScreen from "material-ui/svg-icons/navigation/fullscreen";
import classNames from "classnames";

const durationToText = duration => {
  const minutes = Math.floor(duration / 60);
  const secondes = Math.floor(duration % 60);

  const hasMinutes =
    minutes >= 10 ? `${minutes}:` : minutes > 0 ? `0${minutes}:` : "00:";
  const hasSeconds =
    secondes >= 10 ? `${secondes}` : secondes > 0 ? `0${secondes}` : "00";

  return `${hasMinutes}${hasSeconds}`;
};

class Progress extends PureComponent {
  state = { sliding: false };

  componentDidMount() {
    const self = this;

    const { left, right } = this.progress.getBoundingClientRect();
    var percentage = 0;

    const mousemove = e => {
      e.preventDefault();
      e.stopPropagation();
      const clientX = e.clientX || e.changedTouches[0].clientX;

      if (clientX <= right && clientX >= left) {
        percentage = Math.round(clientX / right * 100);
        self.cursor.style.left = `${percentage}%`;
      }
    };

    const mouseup = e => {
      e.preventDefault();
      e.stopPropagation();
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("touchend", mouseup);
      window.removeEventListener("touchmove", mousemove);

      self.pointer.classList.remove("sliding");

      self.setState({ sliding: false });

      self.props.onChange(self.props.duration * (percentage / 100));
    };

    const mousedown = e => {
      e.preventDefault();
      e.stopPropagation();
      self.setState({ sliding: true });

      self.pointer.classList.add("sliding");

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("touchmove", mousemove);
      window.addEventListener("touchend", mouseup);
      window.addEventListener("mouseup", mouseup);
    };

    this.cursor.addEventListener("mousedown", mousedown);
    this.cursor.addEventListener("touchstart", mousedown);
  }

  getPercentage() {
    return this.props.current / this.props.duration * 100;
  }

  onClickProgress(e) {
    if (this.props.showControls) {
      const clientX = e.clientX || e.changedTouches[0].clientX;
      const { right } = this.progress.getBoundingClientRect();
      const percentage = Math.round(clientX / right * 100);
      const current = this.props.duration * (percentage / 100);

      this.props.onChange(current);
    }
  }

  render() {
    const { current, duration } = this.props;
    const percentage = current / duration * 100;

    return (
      <div className={Style.container}>
        <div
          className={classNames(Style.infoProgress, {
            hide: !this.props.showControls
          })}
        >
          <div className={Style.currentTime}>{durationToText(current)}</div>
          <div className={Style.duration}>{durationToText(duration)}</div>
          <div className={Style.expand} onClick={this.props.onFullscreen}>
            <FullScreen />
          </div>
        </div>

        <div
          className={Style.progress}
          ref={ref => (this.progress = ref)}
          onClick={this.onClickProgress.bind(this)}
        >
          <div
            className={Style.progressCurrent}
            style={{ width: `${percentage}%` }}
          />
          <div
            ref={ref => (this.cursor = ref)}
            style={!this.state.sliding ? { left: `${percentage}%` } : {}}
            className={Style.cursorContainer}
          >
            <div
              ref={ref => (this.pointer = ref)}
              className={classNames(Style.cursor, {
                hide: !this.props.showControls
              })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Progress;
