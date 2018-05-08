// @flow

import type { Dispatch } from "redux";

export type Action = { type: string };

export type Merge = <A: { type: string }>(
  type: $PropertyType<A, "type">,
) => Promise<A>;

export type Callback<A> = ({
  action: A,
  dispatch: Dispatch<any>,
  merge: Merge,
  getState: () => any,
}) => void | Promise<void>;

export type Spork<A: { type: string }> = {
  type: $PropertyType<A, "type">,
  callback: Callback<A>,
};

export type Options = {
  error?: (err: any) => void,
};
