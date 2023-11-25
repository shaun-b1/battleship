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

  getCoordinates(x, y, shipLength) {
    const coordinates = [];

    for (let i = 0; i < shipLength; i++) {
      let row = x + i;
      let col = y;
      coordinates.push([row, col]);
    }

    return coordinates;
  }

  validateCoordinates(coordsArray) {
    this.checkCoordInBoard(coordsArray);
    this.checkCoordOverlap(coordsArray);
  }

  checkCoordInBoard(coordsArray) {
    const isCoordinateOutsideBoard = ([x, y]) =>
      x < 0 || x >= Gameboard.numRows || y < 0 || y >= Gameboard.numCols;

    if (coordsArray.some(isCoordinateOutsideBoard)) {
      throw new Error("You can't place ships outside the gameboard!");
    }
  }

  checkCoordOverlap(coordsArray) {
    const isCoordinateOccupied = (newShipCoord) =>
      this.ships.some((ship) =>
        ship.coords.some((coords) => this.areCoordsEqual(coords, newShipCoord)),
      );

    if (coordsArray.some(isCoordinateOccupied)) {
      throw new Error(
        "You can't place ships on a spot where a ship already is!",
      );
    }
  }

  areCoordsEqual = (coords1, coords2) => {
    return coords1[0] === coords2[0] && coords1[1] === coords2[1];
  };

  placeShip(x, y, length) {
    const ship = new Ship(length);
    const shipCoords = this.getCoordinates(x, y, length);

    // eslint-disable-next-line no-useless-catch
    try {
      this.validateCoordinates(shipCoords);
      ship.coords = shipCoords;
      this.ships.push(ship);
    } catch (error) {
      throw error;
    }
  }

  receiveAttack(x, y) {
    const attackedCoords = [x, y];

    if (this.board[x][y] == "x") {
      throw new Error("You've already fired there!");
    }

    const isAttackOnShip = this.ships.some((ship) =>
      ship.coords.some((coords) => this.areCoordsEqual(coords, attackedCoords)),
    );

    if (isAttackOnShip) {
      const shipToHit = this.ships.find((ship) =>
        ship.coords.some((coords) =>
          this.areCoordsEqual(coords, attackedCoords),
        ),
      );
      shipToHit.hit();
    }

    this.board[x][y] = "x";
  }
}
