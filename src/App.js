import React, { Fragment } from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";

import GlobalStyle from "./styles/global";

import "./config/reactotron";

import Routes from "./routes";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Routes />
      <ReduxToastr />
      <GlobalStyle />
    </Fragment>
  </Provider>
);

export default App;
