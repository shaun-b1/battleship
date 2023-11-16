/* eslint-disable no-undef */
import Ship from "./ship";

describe("Ship", () => {
  test("Should create a Ship object", () => {
    const ship = new Ship(5);
    expect(ship).toBeInstanceOf(Ship);
    expect(ship).toHaveProperty("length", 5);
    expect(ship).toHaveProperty("hit", 0);
  });
});
