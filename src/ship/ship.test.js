/* eslint-disable no-undef */
import Ship from "./ship";

describe("Initialising a new Ship", () => {
  test("Should create a Ship object", () => {
    const ship = new Ship(5);

    expect(ship).toBeInstanceOf(Ship);
    expect(ship).toHaveProperty("length", 5);
    expect(ship).toHaveProperty("hits", 0);
    expect(ship).toHaveProperty("isSunk", false);
  });
});

describe("The hit function", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(5);
  });

  test("A single hit call should increase the hits property once", () => {
    ship.hit();
    expect(ship.hits).toEqual(1);
  });

  test("Multiple hit calls should increase the hits property by the number of calls", () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(2);
  });
});

describe("The sink function", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(4);
    ship.hit();
    ship.hit();
  });

  test("A ship with hits shouldn't be sunk", () => {
    expect(ship.hits).toEqual(2);
    expect(ship.length).toEqual(4);
    expect(ship.isSunk).toBeFalsy;
  });

  test("A ship that recieves a hit shouldn't sink", () => {
    ship.hit();
    expect(ship.hits).toEqual(3);
    expect(ship.length).toEqual(4);
    expect(ship.isSunk).toBeFalsy;
  });

  test("A ship that recieves a hit that equals it's length should sink", () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(4);
    expect(ship.length).toEqual(4);
    expect(ship.isSunk).toBeTruthy;
  });

  test("If a ship somehow receives more hits that it's length, it should still sink", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(5);
    expect(ship.length).toEqual(4);
    expect(ship.isSunk).toBeTruthy;
  });
});
