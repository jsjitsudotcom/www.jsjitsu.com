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

class Video extends PureComponent {
  constructor(props) {
    super(props);

    this.onVideoClick = this.onVideoClick.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    this.play();
    this.hideControls();
  }

  play() {
    this.video.play();
    this.video.style.backgroundImage = null;
  }

  pause() {
    this.video.pause();
  }

  hideControls() {
    this.controls.style.display = "none";
  }

  showControls() {
    this.controls.style.display = "flex";
  }

  onVideoClick() {
    this.showControls();
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

        <div className={Style.controls} ref={ref => (this.controls = ref)}>
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

        <div className={Style.bottom}>
          <div className={Style.infoProgress}>
            <div className={Style.currentTime}>00:23</div>
            <div className={Style.duration}>02:34</div>
            <div className={Style.expand}>
              <FullScreen />
            </div>
          </div>

          <div className={Style.progress}>
            <div className={Style.progressCurrent} />
            <div className={Style.cursor} />
          </div>
        </div>
      </div>
    );
  }
}

export default Video;
