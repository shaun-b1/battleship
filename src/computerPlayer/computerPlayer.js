// import Gameboard from "../gameboard/gameboard";
import { DuplicatedAttackError } from "../error/error";
import Player from "../player/player";

export default class ComputerPlayer extends Player {
  constructor() {
    super();
    this.targetMode = false;
  }

  turn(opposition) {
    const [x, y] = this.generateRandomCoords();
    try {
      const isAttackOnShip = opposition.board.receiveAttack(x, y);
      this.setTargetMode(isAttackOnShip);
    } catch (error) {
      if (error instanceof DuplicatedAttackError) {
        return;
      }
    }
  }

  setTargetMode(isAttackOnShip) {
    if (!this.targetMode && isAttackOnShip) {
      this.targetMode = true;
      this.generateTargetCoords();
    } else if (this.targetMode && isAttackOnShip) {
      this.generateTargetCoords();
    } else {
      this.targetMode = false;
    }
  }

  // generateTargetCoords() {
  //     create a list of possible coordinates around the hit coordinate
  //     return those that are valid with isValidCoords()
  // }
}
