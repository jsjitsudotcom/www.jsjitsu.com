import React, { PureComponent } from "react";
import Style from "./Article.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import arrow from "./../../assets/material-icons/arrow-left.svg";

export default class Article extends PureComponent {
  state = {
    showHeaderTopBg: false,
    showTitleHeader: false,
    hideTitle: false
  };

  componentDidMount() {
    this.listenScroll();
  }

  showHeader() {
    if (this.state.showHeaderTopBg) return false;
    return this.setState({ showHeaderTopBg: true, hideTitle: true });
  }

  hideHeader() {
    if (!this.state.showHeaderTopBg) return false;
    return this.setState({ showHeaderTopBg: false, hideTitle: false });
  }

  showTitleHeader() {
    if (this.state.showTitleHeader) return false;
    return this.setState({ showTitleHeader: true });
  }

  hideTitleHeader() {
    if (!this.state.showTitleHeader) return false;
    return this.setState({ showTitleHeader: false });
  }

  listenScroll() {
    this.container.addEventListener(
      "scroll",
      /* istanbul ignore next */ e => this.onScroll(e)
    );
  }

  onScroll(e) {
    const scrollTop = e.target.scrollTop;
    if (scrollTop >= 300) this.showHeader();
    if (scrollTop <= 300) this.hideHeader();

    if (scrollTop >= 350) this.showTitleHeader();
    if (scrollTop <= 350) this.hideTitleHeader();
  }

  render() {
    const headerTopStyle = classNames(Style.headerTop, {
      [Style.headerTopShowBackground]: this.state.showHeaderTopBg
    });
    const headerTopTitleStyle = classNames(Style.headerTopTitle, {
      [Style.show]: this.state.showTitleHeader
    });
    const titleStyle = classNames(Style.title, {
      [Style.hide]: this.state.hideTitle
    });

    return (
      <div className={Style.container} ref={ref => (this.container = ref)}>
        <div className={Style.header}>
          <div className={headerTopStyle}>
            <div className={Style.back}>
              <img src={arrow} alt="back" />
            </div>
            <div className={headerTopTitleStyle}>
              <span>{this.props.title}</span>
            </div>
          </div>
          <div className={Style.subHeader}>
            <div className={titleStyle}>{this.props.title}</div>
          </div>
        </div>

        <div
          className={Style.body}
          dangerouslySetInnerHTML={{ __html: this.props.text }}
        />
      </div>
    );
  }
}

Article.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string
};

Article.defaultProps = {};
