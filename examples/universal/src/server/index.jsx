import "@babel/polyfill";
import express from "express";
import { join } from "path";
import { get } from "http";

import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createMiddleware } from "redux-spork";

import reducer from "../universal/reducer";
import sporks from "../universal/sporks";
import View from "../universal/View";

const myFetch = url =>
  new Promise((resolve, reject) => {
    get(`http://localhost:8080/${url}`, res => {
      const { statusCode } = res;
      if (statusCode >= 400) {
        resolve(new Error("fail to fetch"));
        return;
      }
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", chunk => (rawData += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(err);
        }
      });
    }).on("error", err => reject(err));
  });

const app = express();
app.use(express.static("./static"));
app.use(express.static("./dist/client"));

app.get("/", async (req, res) => {
  const spork = createMiddleware();
  spork.run(sporks({ fetch: myFetch }));
  const store = createStore(
    reducer,
    {},
    applyMiddleware(spork, createLogger()),
  );
  renderToString(
    <Provider store={store}>
      <View />
    </Provider>,
  );

  await spork.done();

  const state = store.getState();
  const html = renderToString(
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Universal</title>
        <meta
          name="description"
          content="An example to use redux-spork universally."
        />
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <div id="app">
          <Provider store={store}>
            <View />
          </Provider>
        </div>
        <script data-state={JSON.stringify(state)} />
        <script src="index.js" />
      </body>
    </html>,
  );
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(8080);
