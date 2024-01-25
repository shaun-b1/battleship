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
});
