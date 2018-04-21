import React, { PureComponent } from "react";
import Style from "./Menu.scss";
import PropTypes from "prop-types";
import Header from "./components/Header/Header";
import Tabs from "./components/Tabs/Tabs";

export default class Menu extends PureComponent {
  state = { open: false };

  toggle() {
    this.setState(({ open }) => ({ open: !open }));
  }

  render() {
    return (
      <div>
        <Header
          title={this.props.title}
          onMenu={() => this.toggle()}
          isMenuOpen={this.state.open}
        />
        <Tabs open={this.state.open} onClose={() => this.toggle()} />
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
