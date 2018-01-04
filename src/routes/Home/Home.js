import React, { PureComponent } from "react";
import Style from "./Home.scss";
import Header from "./../../components/Header/Header";
import SubHeader from "./../../components/SubHeader/SubHeader";
import Feed from "./../../components/Feed/Feed";
import Connect from "./../../containers/Home";

class Home extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Header fixed />
        <SubHeader fixed />
        <div className={Style.feeds}>
          {Array.from(new Array(20)).map((e, i) => (
            <div className={Style.feed} key={i}>
              <Feed index={i + 1} readed={i % 5 === 0} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Connect(Home);
