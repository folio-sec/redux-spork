# redux-spork [![CircleCI](https://circleci.com/gh/folio-sec/redux-spork/tree/master.svg?style=svg)](https://circleci.com/gh/folio-sec/redux-spork/tree/master) [![codecov.io](https://codecov.io/github/folio-sec/redux-spork/coverage.svg?branch=master)](https://codecov.io/github/folio-sec/redux-spork?branch=master)

Universal middleware for adding a layer to execute side effects to Redux.

## Features

- Do not pollute actions.
- Hook action and execute callbacks.
- The callbacks can be implemented with `Promise` or `Async/Await`, and are not forced to implement with `Generator`.
- In the callbacks, other actions can be dispatched.
- Universal.

## Installation

```sh
yarn add redux-spork
```

## Usage

### 1. Create hook list to fork actions.

```javascript
import { fork } from "redux-spork";

const sporks = [
  fork("FETCH", async ({ dispatch }) => {
    const data = await fetch("./data.json");
    dispatch({ type: "DATA", payload: data });
  }),
];
```

### 2. Setup middleware and apply it to Redux.

```javascript
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createMiddleware } from "redux-spork";

const middleware = createMiddleware();
middleware.run(sporks);
const store = createStore(reducer, applyMiddleware(middleware));
render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

## Examples

- [Client Side Rendering](./examples/client)
- [Universal (Server Side and Client Side Rendering)](./examples/universal)
