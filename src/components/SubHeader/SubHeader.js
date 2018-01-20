import React, { PureComponent } from "react";
import Style from "./SubHeader.scss";
import PropTypes from "prop-types";

const getTabClassName = (tab, active) =>
  tab === active ? Style.tabActive : Style.tab;

export default class SubHeader extends PureComponent {
  render() {
    return (
      <div className={Style.container}>
        <div className={Style.tabs}>
          {this.props.tabs.map((tab, index) => (
            <div
              key={tab}
              onClick={() => this.props.onSelect(tab)}
              className={getTabClassName(tab, this.props.selected)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

SubHeader.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.string,
  onSelect: PropTypes.func
};
