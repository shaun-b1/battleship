/* eslint-disable no-undef */
import Gameboard from "../gameboard/gameboard";
import Player from "./player";
jest.mock("../gameboard/gameboard");

describe("The Player class", () => {
  describe("Initialising a new player", () => {
    test("Should create a new Player object", () => {
      const player = new Player();
      expect(player).toBeInstanceOf(Player);
      expect(player.board).toBeInstanceOf(Gameboard);
    });
  });

  describe("The attackOpposition() function", () => {});
});
