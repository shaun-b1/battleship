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

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("Should create a ship", () => {
    gameboard.placeShip(4, 4, 3);
    expect(Ship).toHaveBeenCalledTimes(1);
    expect(gameboard.ships).toHaveLength(1);
  });

  test("Should create a ship whose cooordinates match its length", () => {
    gameboard.placeShip(4, 4, 3);
    expect(gameboard.ships).toHaveLength(1);
    const mockShipInstance = Ship.mock.instances[0];
    expect(mockShipInstance).toHaveProperty("coords", [
      [4, 4],
      [5, 4],
      [6, 4],
    ]);
  });

  test("Should not create a ship whose coordinates are outside of the gameboard", () => {
    expect(() => {
      gameboard.placeShip(8, 8, 3);
    }).toThrow(Error);
    expect(Ship).not.toHaveBeenCalled;
    expect(gameboard.ships).toHaveLength(0);
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
