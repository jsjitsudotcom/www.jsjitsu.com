import React from "react";
import Style from "./PlayBack.scss";
import Ripple from "./../Ripple/Ripple";
import Play from "./../../assets/icons/play.svg";
import ProgressBar from "./components/ProgressBar/ProgressBar";

const PlayBack = ({ illustration, description, title, percentage }) => (
  <div
    className={Style.container}
    style={{ backgroundImage: `url(${illustration})` }}
  >
    <Ripple style={{ height: "100%" }}>
      <div className={Style.wrapper}>
        <div className={Style.play}>
          <img src={Play} alt="play" />
        </div>
        <div className={Style.infos}>
          <div className={Style.title}>{title}</div>
          <div className={Style.description}>{description}</div>
          <ProgressBar percentage={percentage} />
        </div>
      </div>
    </Ripple>
  </div>
);

export default PlayBack;
