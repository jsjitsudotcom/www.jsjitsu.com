import React, { PureComponent } from "react";
import Style from "./SubHeader.scss";

export default class SubHeader extends PureComponent {
  render() {
    return (
      <div className={Style.container}>
        <div className={Style.tabs}>
          <div className={Style.tab}>Dribbble</div>
          <div className={Style.tabActive}>Medium</div>
          <div className={Style.tab}>Echojs</div>
          <div className={Style.tab}>Dev.to</div>
          <div className={Style.tab}>Echojs</div>
          <div className={Style.tab}>Dribbble</div>
        </div>
      </div>
    );
  }
}
