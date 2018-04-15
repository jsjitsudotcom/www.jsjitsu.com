import React from "react";
import Style from "./Serie.scss";
import Ripple from "./../Ripple/Ripple";

const Serie = ({ illustration, title }) => (
  <div className={Style.container}>
    <Ripple>
      <div
        className={Style.illustration}
        style={{ backgroundImage: `url(${illustration})` }}
      />
      <div className={Style.title}>{title}</div>
    </Ripple>
  </div>
);

export default Serie;
