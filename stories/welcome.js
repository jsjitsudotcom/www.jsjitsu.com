import React from "react";

import { Welcome } from "@storybook/react/demo";

export default (storiesOf, addons) => {
  storiesOf("Welcome", module).add("to Storybook", () => (
    <Welcome showApp={addons.linkTo("Button")} />
  ));
};
