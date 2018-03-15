import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Style from "./Header.scss";
import Menu from "./../../assets/material-icons/menu.svg";
import Add from "./../../assets/material-icons/add.svg";
import Logo from "./../../assets/logo/header.svg";

export default class Header extends PureComponent {
  render() {
    return (
      <header className={Style.container}>
        <div className={Style.menu} onClick={this.props.onClickMenu}>
          <img src={Menu} alt="menu" />
        </div>
        <div className={Style.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={Style.add} onClick={this.props.onClickSubmitFeed}>
          <img src={Add} alt="add" />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  onClickMenu: PropTypes.func,
  onClickSubmitFeed: PropTypes.func,
  fixed: PropTypes.bool
};
