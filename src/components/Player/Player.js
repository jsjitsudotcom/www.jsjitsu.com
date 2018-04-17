import React from "react";
import Info from "./components/Info/Info";
import Offline from "./components/Offline/Offline";
import Episode from "./components/Episode/Episode";
import Video from "./components/Video/Video";

const Player = ({
  title,
  description,
  published,
  views,
  episodes,
  cover,
  source
}) => (
  <div>
    <Video hasNext={true} hasPrevious={false} cover={cover} source={source} />
    <Info
      title={title}
      description={description}
      views={views}
      published={published}
    />
    <Offline isOffline={true} />
    {episodes.map((episode, index) => (
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

export default Player;
