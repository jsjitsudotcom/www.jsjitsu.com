import Raven from "raven-js";

export default () => {
  Raven.config("https://27e345d0d1e04428b7b41bb32b1a0b16@sentry.io/274905", {
    release: process.env.VERSION
  }).install();
};
