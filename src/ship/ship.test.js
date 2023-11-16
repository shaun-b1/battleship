/* eslint-disable no-undef */
import Ship from "./ship";

describe("Initialising a new Ship", () => {
  test("Should create a Ship object", () => {
    const ship = new Ship(5);
    expect(ship).toBeInstanceOf(Ship);
    expect(ship).toHaveProperty("length", 5);
    expect(ship).toHaveProperty("hits", 0);
  });
});

describe("The hit() function", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(5);
  });

  test("One hit should increase the hits property by 1", () => {
    // const ship = new Ship(5);
    ship.hit();
    expect(ship.hits).toEqual(1);
  });

  test("Two hits should increase the hits property by 2", () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(2);
  });
});
