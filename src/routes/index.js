import React from "react";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import Discover from "./../components/Discover/Discover";
import Player from "./../components/Player/Player";
import createStore from "./../stores";

const store = createStore();

const history = syncHistoryWithStore(browserHistory, store);

export default (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Discover} />
        <Route path="/series/:id" component={Player} />
      </Router>
    </Provider>
  </MuiThemeProvider>
);
