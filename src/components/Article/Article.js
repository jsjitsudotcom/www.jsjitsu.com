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
    this.onScroll();
  }

  onScroll() {
    this.container.addEventListener("scroll", e => {
      const scrollTop = e.target.scrollTop;
      if (scrollTop >= 300)
        this.setState({ showHeaderTopBg: true, hideTitle: true });
      if (scrollTop <= 300)
        this.setState({ showHeaderTopBg: false, hideTitle: false });
      if (scrollTop >= 350) this.setState({ showTitleHeader: true });
      if (scrollTop <= 350) this.setState({ showTitleHeader: false });
    });
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
