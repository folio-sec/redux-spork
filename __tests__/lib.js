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

const spork = require("../../redux-spork");

describe("redux-spork", () => {
  it("exports 2 property", () => {
    expect(Object.keys(spork).length).toBe(2);
  });

  it("exports createMiddleware as method", () => {
    expect(typeof spork.createMiddleware).toBe("function");
  });

  it("exports createMiddleware as method", () => {
    expect(typeof spork.fork).toBe("function");
  });
});
