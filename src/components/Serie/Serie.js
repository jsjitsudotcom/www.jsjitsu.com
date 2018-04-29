import React from "react";
import Style from "./Serie.scss";
import Ripple from "./../Ripple/Ripple";

const Serie = ({ illustration, name, onClick }) => (
  <div className={Style.container}>
    <Ripple onClick={onClick}>
      <div
        className={Style.illustration}
        style={{ backgroundImage: `url(${illustration})` }}
      />
      <div className={Style.title}>{name}</div>
    </Ripple>
  </div>
);

export default Serie;
