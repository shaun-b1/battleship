class OutsideBoardError extends Error {
  constructor(message) {
    super(message);
    this.name = "OutsideBoardError";
  }
}

class DuplicatedShipPlacementError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicatedShipPlacementError";
  }
}

class DuplicatedAttackError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicatedAttackError";
  }
}

export {
  OutsideBoardError,
  DuplicatedShipPlacementError,
  DuplicatedAttackError,
};
