import React, { PureComponent } from "react";
import Style from "./Home.scss";
import PropTypes from "prop-types";
import Feed from "./../../components/Feed/Feed";
import Menu from "./../../components/Menu/Menu";
import ModalSubmitFeed from "./../../components/ModalSubmitFeed/ModalSubmitFeed";
import Article from "./../../components/Article/Article";
import Connect from "./../../containers/Home";
import Amplitude from "./../../utils/amplitude";

class Home extends PureComponent {
  state = { menu: false, modalSubmitFeed: false };

  fakeFeeds = Array.from(new Array(5)).map((feed, index) => (
    <div className={Style.feed} key={index + "/loading"}>
      <Feed loading={true} loadingDelay={50 * index} index={index + 1} />
    </div>
  ));

  componentDidMount() {
    this.props.fetchSource(this.props.selected);
  }

  loading() {
    if (this.props.loading) return this.fakeFeeds;
    return [];
  }

  openMenu() {
    Amplitude.logEvent("MENU_OPEN");
    this.setState({ menu: true });
  }

  openSubmitFeed() {
    Amplitude.logEvent("SUBMIT_FEED_OPEN");
    this.setState({ modalSubmitFeed: true });
  }

  closeMenu() {
    Amplitude.logEvent("MENU_CLOSE");
    this.setState({ menu: false });
  }

  render() {
    return (
      <div>
        {this.props.selectedArticle && (
          <Article
            url={this.props.selectedArticle.url}
            content={this.props.selectedArticle.content}
            title={this.props.selectedArticle.title}
            onBack={this.props.onClickBackArticle}
          />
        )}
        <Menu open={this.state.menu} onClose={this.closeMenu.bind(this)} />
        <ModalSubmitFeed
          open={this.state.modalSubmitFeed}
          onClose={() => this.setState({ modalSubmitFeed: false })}
        />
        {/* <Header
          fixed
          onClickMenu={this.openMenu.bind(this)}
          onClickSubmitFeed={this.openSubmitFeed.bind(this)}
        />
        <SubHeader
          fixed
          tabs={this.props.sourcesArray}
          selected={this.props.selected}
          onSelect={this.props.selectSource}
        /> */}
        <div className={Style.feeds}>
          {this.props.feeds
            .map((feed, index) => (
              <div className={Style.feed} key={index}>
                <Feed
                  index={index + 1}
                  link={feed.link}
                  title={feed.title}
                  onClick={() => this.props.onClickFeed(feed.link)}
                  onMount={() => this.props.onFeedMount(feed.link)}
                />
              </div>
            ))
            .concat(this.loading())}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  fetchSource: PropTypes.func,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
  sourceArray: PropTypes.array,
  selectSource: PropTypes.func
};

Home.defaultProps = {
  feeds: [],
  fetchSource: /* istanbul ignore next */ () =>
    console.warn("defaultProps: Home.fetchSource()")
};

export default Connect(Home);
export const Component = Home;
