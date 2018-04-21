import React from "react";

import Discover from "./../src/components/Discover/Discover";
import Illustration from "./__data__/npm.png";

export default (storiesOf, addons) => {
  storiesOf("Discover", module)
    .addDecorator(
      addons.backgrounds([{ name: "Black", value: "#141414", default: true }])
    )
    .add("Le composant basique", () => (
      <div style={{ width: "360px", position: "relative" }}>
        <Discover
          releases={[
            {
              id: 1,
              description: "Initiation à Node: Episode 3",
              title: "Installation de npm",
              illustration: Illustration
            },
            {
              id: 2,
              description: "Initiation à Node: Episode 3",
              title: "Installation de npm",
              illustration: Illustration
            },
            {
              id: 3,
              description: "Initiation à Node: Episode 3",
              title: "Installation de npm",
              illustration: Illustration
            },
            {
              id: 4,
              description: "Initiation à Node: Episode 3",
              title: "Installation de npm",
              illustration: Illustration
            }
          ]}
        />
      </div>
    ));
};
