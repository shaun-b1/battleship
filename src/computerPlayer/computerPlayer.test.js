/* eslint-disable no-undef */
import { DuplicatedAttackError } from "../error/error";
import Gameboard from "../gameboard/gameboard";
import Player from "../player/player";
import ComputerPlayer from "./computerPlayer";
jest.mock("../gameboard/gameboard");

describe("The ComputerPlayer class", () => {
  describe("Initialising a new player", () => {
    test("Should create a new ComputerPlayer object, which should be a subclass of the Player class", () => {
      const computerPlayer = new ComputerPlayer();

      expect(computerPlayer).toBeInstanceOf(ComputerPlayer);
      expect(computerPlayer).toBeInstanceOf(Player);
      expect(computerPlayer.board).toBeInstanceOf(Gameboard);
    });
  });

  describe("The turn() function", () => {
    let player;

    beforeEach(() => {
      player = new ComputerPlayer();
    });

    test("Should generate random coordinates, attack the opposition board, and call setTargetMode() work multiple times in a row", () => {
      const mockOpposition = { board: { receiveAttack: jest.fn() } };
      const mockSetTargetMode = jest.spyOn(player, "setTargetMode");

      jest.spyOn(player, "generateRandomCoords").mockReturnValueOnce([1, 2]);
      player.turn(mockOpposition);

      jest.spyOn(player, "generateRandomCoords").mockReturnValueOnce([3, 4]);
      player.turn(mockOpposition);

      expect(player.generateRandomCoords).toHaveBeenCalledTimes(2);
      expect(mockOpposition.board.receiveAttack).toHaveBeenCalledWith(1, 2);
      expect(mockOpposition.board.receiveAttack).toHaveBeenCalledWith(3, 4);
      expect(mockSetTargetMode).toHaveBeenCalledTimes(2);
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
  });

  describe("The setTargetMode() function", () => {
    let player;

    beforeEach(() => {
      player = new ComputerPlayer();
    });

    test("Should set target mode to true when not in target mode and there is an attack on a ship", () => {
      player.targetMode = false;
      const mockGenerateTargetCoords = jest.spyOn(
        player,
        "generateTargetCoords",
      );

      player.setTargetMode(true);

      expect(player.targetMode).toBe(true);
      expect(mockGenerateTargetCoords).toHaveBeenCalled();
    });

    test("Should set target mode to true when in target mode and there is an attack on a ship", () => {
      player.targetMode = true;
      const mockGenerateTargetCoords = jest.spyOn(
        player,
        "generateTargetCoords",
      );

      player.setTargetMode(true);

      expect(player.targetMode).toBe(true);
      expect(mockGenerateTargetCoords).toHaveBeenCalled();
    });

    test("Should set target mode to false when in target mode and there is no attack on a ship", () => {
      player.targetMode = true;
      const mockGenerateTargetCoords = jest.spyOn(
        player,
        "generateTargetCoords",
      );

      player.setTargetMode(false);

      expect(player.targetMode).toBe(false);
      expect(mockGenerateTargetCoords).not.toHaveBeenCalled();
    });

    test("Should set target mode to false when not in target mode and there is no attack on a ship", () => {
      player.targetMode = false;
      const mockGenerateTargetCoords = jest.spyOn(
        player,
        "generateTargetCoords",
      );

      player.setTargetMode(false);

      expect(player.targetMode).toBe(false);
      expect(mockGenerateTargetCoords).not.toHaveBeenCalled();
    });
  });
});
