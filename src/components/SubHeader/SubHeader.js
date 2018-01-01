import React, { PureComponent } from "react";
import Style from "./SubHeader.scss";
import Click from "./../Sound/Click";

export default class SubHeader extends PureComponent {
  render() {
    return (
      <div className={Style.container}>
        <div className={Style.tabs}>
          <Click sound={11}>
            <div className={Style.tab}>Dribbble</div>
          </Click>
          <Click sound={11}>
            <div className={Style.tabActive}>Medium</div>
          </Click>
          <Click sound={11}>
            <div className={Style.tab}>Echojs</div>
          </Click>
          <Click sound={11}>
            <div className={Style.tab}>Dev.to</div>
          </Click>
          <Click sound={11}>
            <div className={Style.tab}>Echojs</div>
          </Click>
          <Click sound={11}>
            <div className={Style.tab}>Dribbble</div>
          </Click>
        </div>
      </div>
    );
  }
}
