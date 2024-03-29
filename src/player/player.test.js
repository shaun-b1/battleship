/* eslint-disable no-undef */
import Gameboard from "../gameboard/gameboard";
import Player from "./player";
import { DuplicatedAttackError } from "../error/error";
jest.mock("../gameboard/gameboard");

describe("The Player class", () => {
  describe("Initialising a new player", () => {
    test("Should create a new Player object", () => {
      const player = new Player();

      expect(player).toBeInstanceOf(Player);
      expect(player.board).toBeInstanceOf(Gameboard);
    });
  });

  describe("The turn() function", () => {
    test("Should generate random coordinates and attack the opposition board", () => {
      const player = new Player();
      jest.spyOn(player, "generateRandomCoords").mockReturnValue([1, 2]);
      const mockOpposition = { board: { receiveAttack: jest.fn() } };

      player.turn(mockOpposition);

      expect(player.generateRandomCoords).toHaveBeenCalled();
      expect(mockOpposition.board.receiveAttack).toHaveBeenCalledWith(1, 2);
    });

    test("Should work multiple times in a row", () => {
      const player = new Player();
      const mockOpposition = { board: { receiveAttack: jest.fn() } };

      jest.spyOn(player, "generateRandomCoords").mockReturnValueOnce([1, 2]);
      player.turn(mockOpposition);

      jest.spyOn(player, "generateRandomCoords").mockReturnValueOnce([3, 4]);
      player.turn(mockOpposition);

      expect(player.generateRandomCoords).toHaveBeenCalledTimes(2);
      expect(mockOpposition.board.receiveAttack).toHaveBeenCalledWith(1, 2);
      expect(mockOpposition.board.receiveAttack).toHaveBeenCalledWith(3, 4);
    });

    test("Should throw an error if the coordinates are already fired upon", () => {
      const player = new Player();

      const mockOpposition = {
        board: {
          receiveAttack: jest
            .fn()
            .mockImplementationOnce(() => {
              // First call simulation
            })
            .mockImplementationOnce(() => {
              throw new DuplicatedAttackError("You've already fired there!");
            }),
        },
      };

      player.turn(mockOpposition);

      try {
        player.turn(mockOpposition);
      } catch (error) {
        expect(error).toBeInstanceOf(DuplicatedAttackError);
        expect(error.message).toBe("You've already fired there!");
      }
    });
  });

  describe("The generateRandomCoords() function", () => {
    test("Should provide random coordinates within the range 0 to 9", () => {
      const player = new Player();
      for (let i = 0; i < 100; i++) {
        const [x, y] = player.generateRandomCoords();

        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(10);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(10);
      }
    });
  });
});
