import "@babel/polyfill";
import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createMiddleware } from "redux-spork";

import reducer from "../universal/reducer";
import sporks from "../universal/sporks";
import View from "../universal/View";

const myFetch = async url => {
  const res = await fetch(url);
  if (res.status >= 400) {
    throw new Error("fail to fetch");
  }
  const data = await res.json();
  return data;
};

const spork = createMiddleware();
spork.run(sporks({ fetch: myFetch }));
const state = JSON.parse(
  document.querySelector("script[data-state]").getAttribute("data-state"),
);
const store = createStore(
  reducer,
  state,
  applyMiddleware(spork, createLogger()),
);
hydrate(
  <Provider store={store}>
    <View />
  </Provider>,
  document.querySelector("#app"),
);
