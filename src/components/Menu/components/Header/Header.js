import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Style from "./Header.scss";
import Menu from "./../../../../assets/material-icons/menu-white.svg";
import Close from "./../../../../assets/material-icons/close-white.svg";
import Ripple from "./../../../Ripple/Ripple";

export default class Header extends PureComponent {
  render() {
    return (
      <header className={Style.container}>
        <Ripple className={Style.menu} onClick={this.props.onMenu}>
          {!this.props.isMenuOpen && <img src={Menu} alt="menu" />}
          {this.props.isMenuOpen && <img src={Close} alt="menu" />}
        </Ripple>

        <div className={Style.title}>{this.props.title}</div>
      </header>
    );
  }
}

Header.propTypes = {
  onClickMenu: PropTypes.func,
  onClickSubmitFeed: PropTypes.func,
  fixed: PropTypes.bool
};
