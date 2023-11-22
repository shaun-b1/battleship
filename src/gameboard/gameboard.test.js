/* eslint-disable no-undef */
import Ship from "../ship/ship";
import Gameboard from "./gameboard";
jest.mock("../ship/ship");

describe("Initialising a new Gameboard", () => {
  test("Should create a Gameboard object", () => {
    const gameboard = new Gameboard();
    expect(gameboard).toBeInstanceOf(Gameboard);
    expect(gameboard.board).toHaveLength(Gameboard.numRows);
    expect(
      gameboard.board.every((row) => row.length === Gameboard.numCols),
    ).toBe(true);
  });
});

describe("The placeShip function", () => {
  let gameboard;
  let MockedShip;

  beforeEach(() => {
    gameboard = new Gameboard();
    MockedShip = Ship;

    MockedShip.mockImplementation(() => ({
      length: 3,
      hits: 0,
      coords: [],
      isSunk: false,
    }));
  });

  beforeAll(() => {
    Ship.mockClear();
  });

  test("Should place a ship at a certain coordinate", () => {
    gameboard.placeShip(3);
    expect(Ship).toHaveBeenCalledTimes(1);
    expect(gameboard.ships).toHaveLength(1);
    expect(gameboard.ships[0]).toHaveProperty("length", 3);
  });
});

describe("The receiveAttack function", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("Should take co-ordinates", () => {
    gameboard.receiveAttack(4, 4);
    expect(gameboard.board[4][4]).toBe("x");
  });

  test("Should return an error if the coordinates are already fired upon", () => {
    gameboard.receiveAttack(4, 4);
    expect(() => {
      gameboard.receiveAttack(4, 4);
    }).toThrow(Error);
  });
});
