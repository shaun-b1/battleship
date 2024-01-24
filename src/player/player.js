import { DuplicatedAttackError } from "../error/error";
import Gameboard from "../gameboard/gameboard";

export default class Player {
  constructor() {
    this.board = new Gameboard();
  }

  turn(opposition) {
    const [x, y] = this.generateRandomCoords();
    try {
      opposition.board.receiveAttack(x, y);
    } catch (error) {
      if (error instanceof DuplicatedAttackError) {
        return;
      }
    }
  }

  generateRandomCoords() {
    const randomNumber = () => Math.floor(Math.random() * 10);
    return [randomNumber(), randomNumber()];
  }
}
