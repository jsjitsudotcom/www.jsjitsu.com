import React from "react";
import Style from "./ProgressBar.scss";

const ProgressBar = ({ percentage = 0 }) => (
  <div className={Style.container}>
    <div className={Style.progress} style={{ width: `${percentage}%` }} />
  </div>
);

export default ProgressBar;
