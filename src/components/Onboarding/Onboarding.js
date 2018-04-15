import React from "react";
import Style from "./Onboarding.scss";
import Ripple from "./../Ripple/Ripple";

const Onboarding = ({ icon, description, title }) => (
  <div className={Style.container}>
    <div className={Style.wrapper}>
      <img className={Style.icon} alt="icon" src={icon} />
      <div className={Style.title}>{title}</div>
      <div className={Style.description}>{description}</div>
      <div className={Style.buttons}>
        <Ripple>
          <div className={Style.button}>Compris</div>
        </Ripple>
      </div>
    </div>
  </div>
);

export default Onboarding;
