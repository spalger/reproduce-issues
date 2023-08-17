import { getObj } from "./index";

describe("getObj", () => {
  it("returns an object", () => {
    expect(getObj()).toEqual({ foo: 1 });
  });
});
