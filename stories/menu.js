import React from "react";

import Menu from "./../src/components/Menu/Menu";

export default (storiesOf, addons) => {
  storiesOf("Menu", module)
    .addDecorator(
      addons.backgrounds([{ name: "Black", value: "#141414", default: true }])
    )
    .add("Le composant basique", () => (
      <div style={{ width: "360px", position: "relative" }}>
        <Menu title="JSJITSU" />
      </div>
    ));
};
