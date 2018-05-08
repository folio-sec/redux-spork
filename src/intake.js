// @flow

import type { Callback, Spork } from "./types";

export const fork = <A: { type: string }>(
  type: $PropertyType<A, "type">,
  callback: Callback<A>,
): Spork<A> => ({
  type,
  callback,
});
