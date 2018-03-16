import "./../src/styles.scss";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import welcome from "./welcome";
import article from "./article";

welcome(storiesOf, { linkTo, action });
article(storiesOf, { linkTo, action });
