import "reset.css";
import "./styles.scss";

import { render } from "react-dom";
import routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import installSentry from "./utils/sentry";
import Amplitude from "./utils/amplitude";

render(routes, document.getElementById("root"));

const isConnectedInPWA = window.location.search.indexOf("source=pwa") > -1;
Amplitude.logEvent("CONNECT", { pwa: isConnectedInPWA });

if (process.env.NODE_ENV === "production") installSentry();

registerServiceWorker();
