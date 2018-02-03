import React, { PureComponent } from "react";
import Style from "./Home.scss";
import Header from "./../../components/Header/Header";
import SubHeader from "./../../components/SubHeader/SubHeader";
import Feed from "./../../components/Feed/Feed";
import Menu from "./../../components/Menu/Menu";
import ModalSubmitFeed from "./../../components/ModalSubmitFeed/ModalSubmitFeed";
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
        <Menu open={this.state.menu} onClose={this.closeMenu.bind(this)} />
        <ModalSubmitFeed
          open={this.state.modalSubmitFeed}
          onClose={() => this.setState({ modalSubmitFeed: false })}
        />
        <Header
          fixed
          onClickMenu={this.openMenu.bind(this)}
          onClickSubmitFeed={this.openSubmitFeed.bind(this)}
        />
        <SubHeader
          fixed
          tabs={this.props.sourcesArray}
          selected={this.props.selected}
          onSelect={this.props.selectSource}
        />
        <div className={Style.feeds}>
          {this.props.feeds
            .map((feed, index) => (
              <div className={Style.feed} key={index}>
                <Feed index={index + 1} link={feed.link} title={feed.title} />
              </div>
            ))
            .concat(this.loading())}
        </div>
      </div>
    );
  }
}

export default Connect(Home);
