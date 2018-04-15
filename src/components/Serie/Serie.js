import React from "react";
import Style from "./Serie.scss";
import Ripple from "./../Ripple/Ripple";

const Serie = ({ illustration, title }) => (
  <div className={Style.container}>
    <Ripple color="rgba(255,255,255, 0.5)" during={1000}>
      <div
        className={Style.illustration}
        style={{ backgroundImage: `url(${illustration})` }}
      />
      <div className={Style.title}>{title}</div>
    </Ripple>
  </div>
);

export default Serie;
