import React from "react";
import Info from "./components/Info/Info";
import Offline from "./components/Offline/Offline";

const Player = ({ title, description, published, views }) => (
  <div>
    <Info
      title={title}
      description={description}
      views={views}
      published={published}
    />
    <Offline isOffline={true} />
  </div>
);

export default Player;
