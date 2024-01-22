import Gameboard from "../gameboard/gameboard";

export default class Player {
  constructor() {
    this.board = new Gameboard();
  }

  turn(opposition) {
    const [x, y] = this.generateRandomCoords();
    opposition.board.receiveAttack(x, y);
  }

  generateRandomCoords() {
    const randomNumber = () => Math.floor(Math.random() * 10);
    return [randomNumber(), randomNumber()];
  }
}
