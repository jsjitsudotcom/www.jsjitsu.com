import React, { PureComponent } from "react";
import Style from "./Home.scss";
import Header from "./../../components/Header/Header";
import SubHeader from "./../../components/SubHeader/SubHeader";
import Feed from "./../../components/Feed/Feed";
import Connect from "./../../containers/Home";

class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchSource(this.props.selected);
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
          {this.props.feeds.map((feed, index) => (
            <div className={Style.feed} key={index}>
              <Feed index={index + 1} link={feed.link} title={feed.title} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Connect(Home);
