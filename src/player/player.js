import Gameboard from "../gameboard/gameboard";

export default class Player {
  constructor() {
    this.board = new Gameboard();
  }

  // turn() {
  //     call generateRandomCoords to create an x and y coord
  //     call receiveAttack() on oppositionBoard
  // }

  // generateRandomCoords() {
  //     generate coords from numbers randomly using Math.random()
  // }

  // isValidCoords() {
  //     confirm that the coords are inside board, and haven\'t been hit already
  // }

  // setTargetMode() {
  //     if not in targetMode,
  //         set to targetMode
  //         call generateTargetCoords()

  // }

  // generateTargetCoords() {
  //     create a list of possible coordinates around the hit coordinate
  //     return those that are valid with isValidCoords()
  // }
}
