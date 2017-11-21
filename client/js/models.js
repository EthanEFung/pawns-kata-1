/**
//  * story: make 5 by 5 matrix board
//  * story: place 10 'pawns' on the board
 * story: 'pawns' should be able to
 *   a: move one square 'forward' 
 *      edge case: there is a piece currently occupying the square
 *      edge case: there isn't another square present
 *   b: capture an 'opposing piece' +1 away on the primary or secondary diagnol
 * story: define capture
 *  a: replace the 'captured' piece with the active piece
 */

/**
 * i
 * o: 5 x 5 matrix
 * c
 * e
 */
function renderBoard(n) {
  const board = [];
  for (let row = 0; row < n; row++) {
    let currentRow = [];
    for (let col = 0; col < n; col++) {
      currentRow.push(new Square(null, row, col));
    }
    board.push(currentRow);
  }
  return board;
}

function Square(piece = null, row, col) {
  this.occupancy = piece;
  this.row = row;
  this.col = col;
}

/**
 * i: matrix of squares
 * o: matrix of squares with Pawns populating the first and last rows
 * c
 * e
 */
function initializeGame(board) {
  let firstRow = board[0];
  let lastRow = board[board.length - 1];

  firstRow.forEach((sq, i) => {
    sq.occupancy = new Pawn([0, i], "black");
  });
  lastRow.forEach((sq, i) => {
    sq.occupancy = new Pawn([board.length - 1, i], "white");
  });
}

class Pawn {
  constructor(position, side) {
    this.position = position;
    this.side = side;
  }

  /**
   * i:
   * @param {*row, col, occupancy} currentSquare 
   * @param {*row, col, occupancy} desiredSquare 
   * o:
   * c
   * e
   */
  advance(currentSquare, desiredSquare, board) {
    if (
      spaceIsEmpty(desiredSquare) &&
      positionIsOneAway(currentSquare, desiredSquare, this.side)
    ) {
      currentSquare.occupancy = null;
      desiredSquare.occupancy = this;
      this.position(desiredSquare.row, desiredSquare.col, this.side);
    }
  }

  capture(currentSquare, desiredSquare, board) {}

  queen(position) {}
}

function spaceIsEmpty(square) {
  return square.occupancy === null;
}

function positionIsOneAway(current, desired, side) {
  if (side === "white") return current.row === desired.row + 1;
  else if (side === "black") return current.row === desired.row - 1;
  else throw new Error("invalid side was provided ", side);
}

module.exports = {
  renderBoard,
  Square,
  initializeGame,
  Pawn,
  spaceIsEmpty,
  positionIsOneAway
};
