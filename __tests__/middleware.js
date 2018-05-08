// @flow

import { createStore, applyMiddleware } from "redux";
import { createMiddleware } from "../src/middleware";
import { fork } from "../src/intake";

const { fn } = jest;

const createMockStore = (preloadedState = {}, ...middlewares) =>
  createStore(state => state, preloadedState, applyMiddleware(...middlewares));

describe("createMiddleware", () => {
  it("should return middleware for redux", () => {
    const middleware = createMiddleware();
    expect(middleware).toBeInstanceOf(Function);
    const passNext = middleware(createMockStore());
    expect(typeof passNext).toBe("function");
    const passAction = passNext(fn());
    expect(typeof passAction).toBe("function");
    passAction({ type: "FOO" });
  });
});

describe("next", () => {
  it("should be called with passed action", () => {
    const next = fn();
    const middleware = createMiddleware();
    const passNext = middleware(createMockStore());
    const passAction = passNext(next);
    expect(next).not.toBeCalled();
    passAction({ type: "FOO" });
    expect(next).toBeCalledWith({ type: "FOO" });
  });
});

describe("spork", () => {
  describe("arguments", () => {
    describe("getState", () => {
      it("should be able to refer to redux state", () => {
        const middleware = createMiddleware();
        const passNext = middleware(createMockStore({ bar: 100 }, middleware));
        const passAction = passNext(fn());

        middleware.run([
          fork("FOO", ({ getState }) => {
            const state = getState();
            expect(state).toEqual({ bar: 100 });
          }),
        ]);

        passAction({ type: "FOO" });
      });
    });
  });
});
