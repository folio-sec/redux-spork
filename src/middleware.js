// @flow

import type { Spork, Options } from "./types";

export const createMiddleware = ({ error = console.error }: Options = {}) => {
  let disabled = false;
  let map;
  let resolveDone: ?() => void;

  let merges = {};
  const merge = <A: { type: string }>(
    type: $PropertyType<A, "type">,
  ): Promise<A> =>
    new Promise(resolve => {
      if (!merges[type]) {
        merges[type] = [];
      }
      merges[type].push(resolve);
    });

  let running = 0;
  const middleware = ({ getState }: { getState: () => any }) => (
    next: (action: { type: string }) => void,
  ) => {
    const dispatch = (action: { type: string }) => {
      next(action);

      if (merges) {
        const resolves = merges[action.type];
        if (resolves) {
          resolves.forEach(r => {
            r(action);
          });
          delete merges[action.type];
        }
      }

      // Should not work
      // - Before running
      // - After closed
      // - Before setting type-spork map
      if (disabled || !map) {
        return;
      }

      const sporks = map[action.type];
      if (!sporks) {
        return;
      }
      sporks.forEach(async ({ callback }) => {
        running += 1;
        try {
          await callback({ action, dispatch, merge, getState });
        } catch (err) {
          error(err);
        }
        running -= 1;

        if (running === 0 && resolveDone) {
          resolveDone();
        }
      });
    };

    return dispatch;
  };

  middleware.run = (sporks: Array<Spork<any>>) => {
    map = {};
    sporks.forEach(spork => {
      if (!map[spork.type]) {
        map[spork.type] = [];
      }
      map[spork.type].push(spork);
    });
  };

  middleware.done = (): Promise<void> => {
    if (running === 0) {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      resolveDone = () => {
        resolve();
        resolveDone = null;
      };
    });
  };

  middleware.close = () => {
    disabled = true;
  };

  return middleware;
};
