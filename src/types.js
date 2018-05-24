/*
 * Copyright 2018 FOLIO Co.,Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @flow

import type { Dispatch } from "redux";

export type Options = {
  error?: (err: any) => void
};

export type Action = { type: any };

export type Merge = <A: Action>(type: $PropertyType<A, "type">) => Promise<A>;

export type Callback<A: Action> = ({
  action: A,
  dispatch: Dispatch<any>,
  merge: Merge,
  getState: () => any
}) => any | Promise<any>;

export type Spork<A: Action> = {
  type: $PropertyType<A, "type">,
  callback: Callback<A>
};
