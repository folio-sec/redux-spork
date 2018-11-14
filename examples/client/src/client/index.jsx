import "@babel/polyfill";
import React, { Fragment } from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createMiddleware, fork } from "redux-spork";

import reducer from "../universal/reducer";
import sporks from "../universal/sporks";
import View from "../universal/View";

const myFetch = async url => {
  const res = await fetch(url);
  if (res.status >= 400) {
    throw new Error("fail to request");
  }
  const data = await res.json();
  return data;
};

const spork = createMiddleware();
spork.run(sporks({ fetch: myFetch }));
const store = createStore(reducer, applyMiddleware(spork, createLogger()));
render(
  <Provider store={store}>
    <View />
  </Provider>,
  document.querySelector("#app"),
);
