import React from "react";

import Article from "./../src/components/Article/Article";

import { text } from "./__data__/article.json";

export default (storiesOf, addons) => {
  storiesOf("Article", module).add("L'article en mode normal", () => (
    <Article title="Transform your codebase using codemods" text={text} />
  ));
};
