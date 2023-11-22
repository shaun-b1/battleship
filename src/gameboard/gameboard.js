import Ship from "../ship/ship";

export default class Gameboard {
  static numRows = 10;
  static numCols = 10;

  constructor() {
    this.board = this.createBoard();
    this.ships = [];
  }

  createBoard() {
    return Array.from({ length: Gameboard.numRows }, () =>
      Array(Gameboard.numCols).fill(null),
    );
  }

  placeShip(length) {
    this.ships.push(new Ship(length));
  }

  receiveAttack(x, y) {
    if (this.board[x][y] == "x") {
      throw new Error("You've already fired there!");
    } else {
      this.board[x][y] = "x";
    }
  }
}
