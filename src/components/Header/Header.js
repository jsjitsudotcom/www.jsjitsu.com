import React, { PureComponent } from "react";
import Style from "./Header.scss";
import Menu from "./../../assets/material-icons/menu.svg";
import Logo from "./../../assets/logo/header.svg";

export default class Header extends PureComponent {
  render() {
    return (
      <div className={Style.container}>
        <div className={Style.menu}>
          <img src={Menu} alt="menu"/>
        </div>
        <div className={Style.logo}>
        <img src={Logo} alt="logo"/>
        </div>
      </div>
    );
  }
}
