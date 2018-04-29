import React, { PureComponent } from "react";
import Style from "./Tabs.scss";
import PropTypes from "prop-types";
import Amplitude from "./../../../../utils/amplitude";

export default class Menu extends PureComponent {
  onClick(e) {
    Amplitude.logEvent("MENU_LINK_CLICK", {
      url: e.target.href
    });
  }

  render() {
    const styleContainer = this.props.open
      ? Style.containerOpen
      : Style.container;

    return (
      <div className={styleContainer}>
        <div className={Style.overlay} onClick={this.props.onClose} />
        <div className={Style.menu}>
          <div className={Style.wrapper}>
            <div className={Style.tabs}>
              <a
                href="https://medium.com/jsjitsu/foire-aux-questions-ccd7b515429d"
                className={Style.tab}
                onClick={() => this.onClick()}
              >
                C'est quoi jsjitsu ?
              </a>
              <a
                href="https://medium.com/jsjitsu/politique-de-confidentialit%C3%A9-a91107de4b69"
                className={Style.tab}
                onClick={() => this.onClick()}
              >
                Confidentialité
              </a>
              <a
                href="https://www.facebook.com/jsjitsu/"
                className={Style.tab}
                onClick={() => this.onClick()}
              >
                Page Facebook
              </a>
              <a
                href="https://twitter.com/jsjitsudotcom"
                className={Style.tab}
                onClick={() => this.onClick()}
              >
                Page Twitter
              </a>
              <a
                href="https://medium.com/jsjitsu"
                className={Style.tab}
                onClick={() => this.onClick()}
              >
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
  open: PropTypes.bool,
  onClose: PropTypes.func
};

Menu.defaultProps = {
  open: false,
  onClose: /* istanbul ignore next*/ () =>
    console.warn("defaultProps: Menu.onClose()")
};
