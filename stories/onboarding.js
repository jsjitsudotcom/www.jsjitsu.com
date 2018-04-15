import React from "react";

import Onboarding from "./../src/components/Onboarding/Onboarding";
import School from "./../src/assets/material-icons/school.svg";

export default (storiesOf, addons) => {
  storiesOf("Onboarding", module)
    .addDecorator(
      addons.backgrounds([{ name: "Black", value: "#141414", default: true }])
    )
    .add("Le composant basique", () => (
      <div style={{ width: "360px" }}>
        <Onboarding
          title="Apprennez le Javascript"
          icon={School}
          description="Avec Jsjitsu, vous pouvez n’importe où et à n’importe quel moment, apprendre de nouvelles choses sur le Javascript. L’application et les vidéos sont disponible même sans connexion internet."
        />
      </div>
    ));
};
