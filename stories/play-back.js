import React from "react";

import PlayBack from "./../src/components/PlayBack/PlayBack";
import Carousel from "./../src/components/Carousel/Carousel";
import Illustration from "./__data__/node.png";

export default (storiesOf, addons) => {
  storiesOf("PlayBack", module)
    .addDecorator(
      addons.backgrounds([{ name: "Black", value: "#141414", default: true }])
    )
    .add("Le composant d'une série", () => (
      <PlayBack
        illustration={Illustration}
        title="Comment installer Node & Npm"
        description="Initiation à Node: Episode 3"
        percentage={25}
      />
    ))
    .add("Les séries en mode carousel", () => (
      <Carousel
        title="Reprendre"
        description="Revoir ou reprendre là où vous vous êtes arrêté"
      >
        <PlayBack
          illustration={Illustration}
          title="Comment installer Node & Npm"
          description="Initiation à Node: Episode 3"
          percentage={25}
        />
        <PlayBack
          illustration={Illustration}
          title="Comment installer Node & Npm"
          description="Initiation à Node: Episode 3"
          percentage={25}
        />
        <PlayBack
          illustration={Illustration}
          title="Comment installer Node & Npm"
          description="Initiation à Node: Episode 3"
          percentage={25}
        />
        <PlayBack
          illustration={Illustration}
          title="Comment installer Node & Npm"
          description="Initiation à Node: Episode 3"
          percentage={25}
        />
        <PlayBack
          illustration={Illustration}
          title="Comment installer Node & Npm"
          description="Initiation à Node: Episode 3"
          percentage={25}
        />
        <PlayBack
          illustration={Illustration}
          title="Comment installer Node & Npm"
          description="Initiation à Node: Episode 3"
          percentage={25}
        />
        <PlayBack
          illustration={Illustration}
          title="Comment installer Node & Npm"
          description="Initiation à Node: Episode 3"
          percentage={25}
        />
        <PlayBack
          illustration={Illustration}
          title="Comment installer Node & Npm"
          description="Initiation à Node: Episode 3"
          percentage={25}
        />
      </Carousel>
    ));
};
