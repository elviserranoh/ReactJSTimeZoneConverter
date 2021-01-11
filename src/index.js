import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./duck/store";
import { TimeZoneConverterApp } from "./TimeZoneConverterApp";

ReactDOM.render(
  <Provider store={store}>
    <TimeZoneConverterApp />
  </Provider>,
  document.getElementById("root")
);
