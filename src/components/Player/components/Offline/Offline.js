import React from "react";
import Style from "./Offline.scss";
import { Toggle } from "material-ui";

const styles = {
  thumbOff: {
    backgroundColor: "#fff"
  },
  trackOff: {
    backgroundColor: "#fff",
    opacity: 0.5
  },
  thumbSwitched: {
    backgroundColor: "#FFEA00"
  },
  trackSwitched: {
    backgroundColor: "#FFEA00",
    opacity: 0.5
  }
};

const Offline = ({ isOffline }) => (
  <div className={Style.container}>
    <div className={Style.title}>Disponible hors ligne</div>
    <div className={Style.toggle}>
      <Toggle
        thumbStyle={styles.thumbOff}
        trackStyle={styles.trackOff}
        thumbSwitchedStyle={styles.thumbSwitched}
        trackSwitchedStyle={styles.trackSwitched}
      />
    </div>
  </div>
);

export default Offline;
