import React, { PureComponent } from "react";
import Style from "./Video.scss";
import classNames from "classnames";

import FullScreen from "material-ui/svg-icons/navigation/fullscreen";
import Previous from "./../../../../assets/icons/video-previous.svg";
import Next from "./../../../../assets/icons/video-next.svg";
import Play from "./../../../../assets/icons/play.svg";

const addInactive = style => isActive =>
  classNames(style, { [Style.inactive]: !isActive });

const isNextInactive = addInactive(Style.next);
const isPreviousInactive = addInactive(Style.previous);

const durationToText = duration => {
  const minutes = Math.floor(duration / 60);
  const secondes = Math.floor(duration % 60);

  const hasMinutes =
    minutes >= 10 ? `${minutes}:` : minutes > 0 ? `0${minutes}:` : "00:";
  const hasSeconds =
    secondes >= 10 ? `${secondes}` : secondes > 0 ? `0${secondes}` : "00";

  return `${hasMinutes}${hasSeconds}`;
};

class Video extends PureComponent {
  constructor(props) {
    super(props);

    this.onVideoClick = this.onVideoClick.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
  }

  state = {
    duration: "00:00",
    current: "00:00",
    percentage: 0,
    showControls: true
  };

  componentDidMount() {
    this.play();
    this.hideControls();
  }

  play() {
    this.video.play();

    this.video.ontimeupdate = () => {
      this.setState({
        current: durationToText(this.video.currentTime),
        duration: durationToText(this.video.duration),
        percentage: this.video.currentTime / this.video.duration * 100
      });
    };

    this.video.style.backgroundImage = null;
  }

  pause(e) {
    e.stopPropagation();
    this.video.pause();
  }

  hideControls() {
    this.setState({ showControls: false });
  }

  showControls() {
    this.setState({ showControls: true });
  }

  onVideoClick() {
    if (this.state.showControls) return this.hideControls();
    return this.showControls();
  }

  render() {
    const { hasNext, hasPrevious, source, cover } = this.props;

    return (
      <div className={Style.container}>
        <video
          onClick={this.onVideoClick}
          ref={ref => (this.video = ref)}
          className={Style.video}
          style={{ backgroundImage: `url(${cover})` }}
        >
          <source src={source} type="video/mp4" />
        </video>

        {this.state.showControls && (
          <div
            className={Style.controls}
            ref={ref => (this.controls = ref)}
            onClick={this.onVideoClick}
          >
            <div className={isPreviousInactive(hasPrevious)}>
              <img src={Previous} alt="previous" />
            </div>

            <div className={Style.play} onClick={this.pause}>
              <img src={Play} alt="play" />
            </div>

            <div className={isNextInactive(hasNext)}>
              <img src={Next} alt="next" />
            </div>
          </div>
        )}

        <div className={Style.bottom}>
          <div className={Style.infoProgress}>
            <div className={Style.currentTime}>{this.state.current}</div>
            <div className={Style.duration}>{this.state.duration}</div>
            <div className={Style.expand}>
              <FullScreen />
            </div>
          </div>

          <div className={Style.progress}>
            <div
              className={Style.progressCurrent}
              style={{ width: `${this.state.percentage}%` }}
            />
            <div className={Style.cursor} />
          </div>
        </div>
      </div>
    );
  }
}

export default Video;
