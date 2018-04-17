import React from "react";
import Style from "./Video.scss";
import FullScreen from "material-ui/svg-icons/navigation/fullscreen";
import Previous from "./../../../../assets/icons/video-previous.svg";
import Next from "./../../../../assets/icons/video-next.svg";
import Play from "./../../../../assets/icons/play.svg";

const Video = ({}) => (
  <div className={Style.container}>
    <div className={Style.controls}>
      <div className={Style.previous}>
        <img src={Previous} alt="previous" />
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

export default Video;
