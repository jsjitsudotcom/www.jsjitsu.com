import "./../src/styles.scss";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import backgrounds from "@storybook/addon-backgrounds";

import welcome from "./welcome";
import article from "./article";
import serie from "./serie";
import onboarding from "./onboarding";
import playBack from "./play-back";

welcome(storiesOf, { linkTo, action, backgrounds });
article(storiesOf, { linkTo, action, backgrounds });
playBack(storiesOf, { linkTo, action, backgrounds });
onboarding(storiesOf, { linkTo, action, backgrounds });
serie(storiesOf, { linkTo, action, backgrounds });
