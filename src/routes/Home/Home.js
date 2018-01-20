import React, { PureComponent } from "react";
import Style from "./Home.scss";
import Header from "./../../components/Header/Header";
import SubHeader from "./../../components/SubHeader/SubHeader";
import Feed from "./../../components/Feed/Feed";
import Connect from "./../../containers/Home";

class Home extends PureComponent {
  fakeFeeds = Array.from(new Array(5)).map((feed, index) => (
    <div className={Style.feed} key={index + "/loading"}>
      <Feed loading={true} loadingDelay={50 * (index + 1)} index={index + 1} />
    </div>
  ));

  componentDidMount() {
    this.props.fetchSource(this.props.selected);
  }

  loading() {
    if (this.props.loading) return this.fakeFeeds;
    return [];
  }

  render() {
    return (
      <div>
        <Header fixed />
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
