import React, { PureComponent } from "react";
import Style from "./Video.scss";
import classNames from "classnames";
import Progress from "./components/Progress/Progress";
import Controls from "./components/Controls/Controls";

import ArrayLeft from "./../../../../assets/material-icons/arrow-left-white.svg";
import Share from "./../../../../assets/material-icons/share.svg";

class Video extends PureComponent {
  constructor(props) {
    super(props);

    this.onVideoClick = this.onVideoClick.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
  }

  state = {
    percentage: 0,
    showControls: true,
    isPlaying: false
  };

  componentDidMount() {
    // this.play();
    this.hideControls();
  }

  componentDidUpdate(props) {
    // if(props.source !== this.props.source) return this.play();
  }

  play(e) {
    console.log(this.props.source);
    if (e) e.stopPropagation();

    this.video.play();
    this.setState({ isPlaying: true });

    this.video.ontimeupdate = () => {
      this.setState({
        current: this.video.currentTime,
        duration: this.video.duration
      });
    };

    this.video.style.backgroundImage = null;
  }

  pause(e) {
    e.stopPropagation();
    this.video.pause();
    this.setState({ isPlaying: false });

    this.video.ontimeupdate = () => false;
  }

  changeCursor(time) {
    this.video.currentTime = time;
    this.setState({ current: time });
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

  enableFullscreen(e) {
    // e.stopPropagation();
    // var elem = document.getElementById("video");
    // if (elem.requestFullscreen) {
    //   elem.requestFullscreen();
    // }
  }

  render() {
    const { hasNext, hasPrevious, source, cover } = this.props;

    return (
      <div className={Style.container} ref={ref => (this.container = ref)}>
        <div
          className={classNames(Style.menu, { hide: !this.state.showControls })}
          onClick={this.onVideoClick}
        >
          <div className={Style.back} onClick={this.props.onBack}>
            <img src={ArrayLeft} alt="back" />
          </div>
          <div className={Style.share}>
            <img src={Share} alt="back" />
          </div>
        </div>
        <video
          id="video"
          onClick={this.onVideoClick}
          ref={ref => (this.video = ref)}
          className={Style.video}
          style={{ backgroundImage: `url(${cover})` }}
        >
          <source src={source} type="video/mp4" />
        </video>

        <div className={Style.controls} onClick={this.onVideoClick}>
          <Controls
            show={this.state.showControls}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
            onPlay={this.play}
            onPause={this.pause}
            isPlaying={this.state.isPlaying}
          />
        </div>

        <div className={Style.bottom}>
          <Progress
            current={this.state.current}
            duration={this.state.duration}
            showControls={this.state.showControls}
            onChange={this.changeCursor.bind(this)}
            onFullscreen={this.enableFullscreen.bind(this)}
          />
        </div>
      </div>
    );
  }
}

Video.defaultProps = {
  onBack: /* istanbul ignore next */ () => false
};

export default Video;
