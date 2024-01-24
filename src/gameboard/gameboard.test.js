/* eslint-disable no-undef */
import {
  DuplicatedAttackError,
  DuplicatedShipPlacementError,
  OutsideBoardError,
} from "../error/error";
import Ship from "../ship/ship";
import Gameboard from "./gameboard";
jest.mock("../ship/ship");

describe("The Gameboard class", () => {
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
      }).toThrow(OutsideBoardError);
      expect(Ship).not.toHaveBeenCalled;
      expect(gameboard.ships).toHaveLength(0);
    });

    test("Should not create a ship whose coordinates overlap with another ship", () => {
      gameboard.placeShip(4, 4, 3);
      expect(gameboard.ships).toHaveLength(1);
      expect(() => {
        gameboard.placeShip(6, 4, 3);
      }).toThrow(DuplicatedShipPlacementError);
      expect(gameboard.ships).toHaveLength(1);
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
      }).toThrow(DuplicatedAttackError);
    });

    test("Should fire on a ship, increasing it's hits by 1", () => {
      gameboard.placeShip(4, 4, 3);
      expect(gameboard.ships).toHaveLength(1);
      const mockShipInstance = Ship.mock.instances[0];
      mockShipInstance.hit = jest.fn();
      gameboard.receiveAttack(4, 4);
      expect(mockShipInstance.hit).toHaveBeenCalledTimes(1);
    });

    test("Should hit the correct ship, increasing it's hits by 1", () => {
      gameboard.placeShip(3, 4, 3);
      gameboard.placeShip(5, 6, 4);
      const mockShipInstance = Ship.mock.instances[0];
      const secondMockShipInstance = Ship.mock.instances[1];
      mockShipInstance.hit = jest.fn();
      secondMockShipInstance.hit = jest.fn();
      gameboard.receiveAttack(7, 6);
      expect(mockShipInstance.hit).not.toHaveBeenCalled();
      expect(secondMockShipInstance.hit).toHaveBeenCalledTimes(1);
    });

    test("Should hit the correct ship multiple times, increasing it's hits proportionately", () => {
      gameboard.placeShip(4, 4, 3);
      const mockShipInstance = Ship.mock.instances[0];
      mockShipInstance.hit = jest.fn();
      gameboard.receiveAttack(5, 4);
      gameboard.receiveAttack(6, 4);
      expect(mockShipInstance.hit).toHaveBeenCalledTimes(2);
    });

    test("Should not hit a ship when the attack is a miss", () => {
      gameboard.placeShip(4, 4, 3);
      const mockShipInstance = Ship.mock.instances[0];
      mockShipInstance.hit = jest.fn();
      gameboard.receiveAttack(1, 1);
      expect(mockShipInstance.hit).not.toHaveBeenCalled;
    });
  });

  describe("The allSunk() function", () => {
    let gameboard;
    let mockShipInstance;
    let secondMockShipInstance;

    beforeEach(() => {
      gameboard = new Gameboard();
      gameboard.placeShip(4, 4, 3);
      gameboard.placeShip(2, 6, 4);
      mockShipInstance = Ship.mock.instances[0];
      secondMockShipInstance = Ship.mock.instances[1];
      mockShipInstance.isSunk = false;
      secondMockShipInstance.isSunk = false;
    });

    test("Should not return true if no ships are sunk", () => {
      expect(mockShipInstance.isSunk).toBeFalsy();
      expect(secondMockShipInstance.isSunk).toBeFalsy();
      expect(gameboard.allSunk()).toBeFalsy();
    });

    test("Should not return true if some ships are sunk", () => {
      mockShipInstance.isSunk = true;
      expect(mockShipInstance.isSunk).toBeTruthy();
      expect(secondMockShipInstance.isSunk).toBeFalsy();
      expect(gameboard.allSunk()).toBeFalsy();
    });

    test("Should return true if all ships are sunk", () => {
      mockShipInstance.isSunk = true;
      secondMockShipInstance.isSunk = true;
      expect(mockShipInstance.isSunk).toBeTruthy();
      expect(secondMockShipInstance.isSunk).toBeTruthy();
      expect(gameboard.allSunk()).toBeTruthy();
    });
  });
});
