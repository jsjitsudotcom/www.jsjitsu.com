import React from "react";
import Style from "./Episode.scss";
import Play from "./../../../../assets/icons/play-episode.svg";

const durationToText = duration => {
  const minutes = Math.floor(duration / 60);
  const secondes = duration % 60;

  const hasMinutes = minutes > 0 ? `${minutes} minutes` : null;
  const hasSeconds = secondes > 0 ? `${secondes} secondes` : null;
  const hasMinutesAndSecondes = hasMinutes && hasSeconds ? " et " : null;

  return [hasMinutes, hasMinutesAndSecondes, hasSeconds].reduce(
    (initial, value) => {
      if (value) return initial + value;
      return initial;
    },
    ""
  );
};

const Episode = ({ title, duration, index, active }) => (
  <div className={Style.container}>
    <div className={`${Style.index} ${active ? Style.active : ""}`}>
      {index}
    </div>
    <div className={Style.info}>
      <div className={Style.title}>{title}</div>
      <div className={Style.duration}>{durationToText(duration)}</div>
    </div>
    <img src={Play} alt="play" className={Style.play} />
  </div>
);

export default Episode;
