/* eslint-disable no-undef */
import Gameboard from "../gameboard/gameboard";
import Player from "../player/player";
import ComputerPlayer from "./computerPlayer";
jest.mock("../gameboard/gameboard");

describe("The ComputerPlayer class", () => {
  describe("Initialising a new player", () => {
    test("Should create a new ComputerPlayer object", () => {
      const computerPlayer = new ComputerPlayer();

      expect(computerPlayer).toBeInstanceOf(ComputerPlayer);
      expect(computerPlayer.board).toBeInstanceOf(Gameboard);
    });
    test("Which should be a subclass of the Player class", () => {
      const computerPlayer = new ComputerPlayer();

      expect(computerPlayer).toBeInstanceOf(ComputerPlayer);
      expect(computerPlayer).toBeInstanceOf(Player);
    });
  });

  describe("The turn() function", () => {
    let player;

    beforeEach(() => {
      player = new ComputerPlayer();
    });

    test("Should generate random coordinates and attack the opposition board", () => {
      jest.spyOn(player, "generateRandomCoords").mockReturnValue([1, 2]);
      const mockOpposition = { board: { receiveAttack: jest.fn() } };

      player.turn(mockOpposition);

      expect(player.generateRandomCoords).toHaveBeenCalled();
      expect(mockOpposition.board.receiveAttack).toHaveBeenCalledWith(1, 2);
    });

    test("Should work multiple times in a row", () => {
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

    test("Should call setTargetMode()", () => {
      const mockOpposition = { board: { receiveAttack: jest.fn() } };
      const mockSetTargetMode = jest.spyOn(player, "setTargetMode");

      player.turn(mockOpposition);

      expect(mockSetTargetMode).toHaveBeenCalled();
    });
  });

  describe("The setTargetMode() function", () => {
    let player;

    beforeEach(() => {
      player = new ComputerPlayer();
    });

    test("Should set target mode to true when there is an attack on a ship", () => {
      const mockOpposition = { board: { receiveAttack: jest.fn(() => true) } };

      player.turn(mockOpposition);

      expect(player.targetMode).toBe(true);
    });

    test("Should not set target mode to true when the attack misses a ship", () => {
      const mockOpposition = { board: { receiveAttack: jest.fn(() => false) } };

      player.turn(mockOpposition);

      expect(player.targetMode).toBe(false);
    });
  });
});
