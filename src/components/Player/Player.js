import React, { PureComponent } from "react";
import Connect from "./containers/Player";
import Info from "./components/Info/Info";
import Offline from "./components/Offline/Offline";
import Episode from "./components/Episode/Episode";
import Video from "./components/Video/Video";

class Player extends PureComponent {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div>
        <Video
          hasNext={true}
          hasPrevious={false}
          cover={this.props.illustration}
          source={this.props.source}
          onBack={this.props.onBack}
        />
        <Info
          title={this.props.title}
          description={this.props.description}
          views={this.props.views}
          published={this.props.published}
        />
        <Offline isOffline={true} />
        {this.props.episodes.map((episode, index) => (
          <Episode
            title={episode.title}
            duration={episode.duration}
            index={index + 1}
            key={index}
            active={index === 0}
          />
        ))}
      </div>
    );
  }
}

Player.defaultProps = {
  episodes: [],
  onMount: /* istanbul ignore next */ () => false
};

export const Component = Player;
export default Connect(Player);
