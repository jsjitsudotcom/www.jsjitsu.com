import React, { PureComponent } from "react";
import Style from "./Menu.scss";
import PropTypes from "prop-types";
import Logo from "./../../assets/logo/header.svg";

export default class Menu extends PureComponent {
  render() {
    const styleContainer = this.props.open
      ? Style.containerOpen
      : Style.container;
    return (
      <div className={styleContainer}>
        <div className={Style.overlay} onClick={this.props.onClose} />
        <div className={Style.menu}>
          <div className={Style.wrapper}>
            <div className={Style.menuHeader}>
              <img src={Logo} alt="menu" />
            </div>
            <div className={Style.tabs}>
              <a href="#/" className={Style.tab}>
                C'est quoi jsjitsu ?
              </a>
              <a href="#/" className={Style.tab}>
                Confidentialité
              </a>
              <a href="#/" className={Style.tab}>
                Page Facebook
              </a>
              <a href="#/" className={Style.tab}>
                Page Twitter
              </a>
              <a href="#/" className={Style.tab}>
                Page Medium
              </a>
            </div>

            <div className={Style.footer}>{process.env.VERSION}</div>
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  open: PropTypes.bool
};

Menu.defaultProps = {
  open: false
};
