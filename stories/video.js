import React from "react";

import Body from "./utils/Body";
import Player from "./../src/components/Player/Player";

export default (storiesOf, addons) => {
  storiesOf("Video", module)
    .addDecorator(
      addons.backgrounds([{ name: "Black", value: "#141414", default: true }])
    )
    .add("Le composant Player", () => (
      <Body>
        <div style={{ width: "360px" }}>
          <Player
            title="Installation de Node"
            published={new Date()}
            views={234}
            description="Avec Jsjitsu, vous pouvez n’importe où et à n’importe quel moment, apprendre de nouvelles choses sur le Javascript. L’application et les vidéos sont disponible même sans connexion internet."
            episodes={[
              { title: "Installation de Node", duration: 125 },
              { title: "Installation de Npm", duration: 120 },
              { title: "Explications du fichier package.json", duration: 56 }
            ]}
          />
        </div>
      </Body>
    ));
};
