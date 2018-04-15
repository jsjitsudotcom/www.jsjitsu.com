import React from "react";

import Serie from "./../src/components/Serie/Serie";
import Carousel from "./../src/components/Carousel/Carousel";
import Illustration from "./__data__/npm.png";

export default (storiesOf, addons) => {
  storiesOf("Serie", module)
    .addDecorator(
      addons.backgrounds([{ name: "Black", value: "#141414", default: true }])
    )
    .add("Le composant d'une série", () => (
      <Serie illustration={Illustration} title="Initiation à npm" />
    ))
    .add("Les séries en mode carousel", () => (
      <Carousel
        title="Les nouvelles sorties"
        description="Toutes catégories confondues"
      >
        <Serie illustration={Illustration} title="Initiation à npm" />
        <Serie illustration={Illustration} title="Initiation à npm" />
        <Serie illustration={Illustration} title="Initiation à npm" />
        <Serie illustration={Illustration} title="Initiation à npm" />
        <Serie illustration={Illustration} title="Initiation à npm" />
        <Serie illustration={Illustration} title="Initiation à npm" />
        <Serie illustration={Illustration} title="Initiation à npm" />
        <Serie illustration={Illustration} title="Initiation à npm" />
        <Serie illustration={Illustration} title="Initiation à npm" />
        <Serie illustration={Illustration} title="Initiation à npm" />
      </Carousel>
    ));
};
