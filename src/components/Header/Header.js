import React, { PureComponent } from "react";
import Style from "./Header.scss";
import Menu from "./../../assets/material-icons/menu.svg";
import Logo from "./../../assets/logo/header.svg";
import Click from "./../../components/Sound/Click";

export default class Header extends PureComponent {
  render() {
    return (
      <header className={Style.container}>
        <Click sound={9}>
          <div className={Style.menu}>
            <img src={Menu} alt="menu" />
          </div>
        </Click>
        <div className={Style.logo}>
          <img src={Logo} alt="logo" />
        </div>
      </header>
    );
  }
}
