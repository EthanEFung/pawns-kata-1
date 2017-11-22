const {
  renderBoard,
  initializeGame,
  Pawn,
  Square,
  squareIsEmpty,
  rowIsOneAway,
  squareHasOpposingPawn
} = require("../client/js/models");

describe("Square constructor", function() {
  it("should render an object", function() {
    let test = new Square(null, 0, 0);
    const expected = {
      row: 0,
      col: 0,
      occupancy: null
    };
    expect(test).toEqual(expected);
  });
});

describe("renderBoard", function() {
  it("should render a 5x5 board when specified", function() {
    const expected = require("./emptyBoard");
    const actual = renderBoard(5);
    expect(actual).toEqual(expected);
  });
});

describe("initializeGame", function() {
  it("should have the first row and last row occupied", function() {
    const expected = require("./initializedBoard");
    const test = renderBoard(5);
    initializeGame(test);
    expect(test).toEqual(expected);
  });
});

describe("squareIsEmpty", function() {
  it("should render true if the position is open", function() {
    const current = new Square(new Pawn([4, 0], "white"), 4, 0);
    const desired = new Square(null, 3, 0);
    const test = squareIsEmpty(desired);
    expect(test).toBeTruthy();
  });
  it("should render false if the position is occupied", function() {
    const current = new Square(new Pawn([4, 0], "white"), 4, 0);
    const desired = new Square(new Pawn([3, 0], "black"), 3, 0);
    const test = squareIsEmpty(desired);
    expect(test).toBeFalsy();
  });
});

describe("rowIsOneAway", function() {
  it("should render the true for white pieces", function() {
    const current = new Square(null, 4, 0);
    const desired = new Square(null, 3, 0);
    const test = rowIsOneAway(current, desired, "white");
    expect(test).toBeTruthy();
  });
  it("should render true for black pieces", function() {
    const current = new Square(null, 0, 0);
    const desired = new Square(null, 1, 0);
    const test = rowIsOneAway(current, desired, "black");
    expect(test).toBeTruthy();
  });
  it("should throw and error if no side is provided to the position", function() {
    const current = new Square(null, 0, 0);
    const desired = new Square(null, 1, 0);
    const test = () => rowIsOneAway(current, desired);
    expect(test).toThrow("invalid side was provided ", undefined);
  });
});

describe("Pawn", function() {
  it("should keep track of the row and col, the pawn is currently on", function() {
    const test = new Pawn([0, 0], "black");
    const actual = test.position;
    const expected = [0, 0];

    expect(actual).toEqual(expected);
  });
  it("should should know which side it is on", function() {
    const test = new Pawn([0, 0], "black");
    const actual = test.side;
    const expected = "black";
    expect(actual).toEqual(expected);
  });
  it("should be able to advance to an empty square", function() {
    const test = new Pawn([4, 0], "white");
    const current = new Square(test, 4, 0);
    const desired = new Square(null, 3, 0);
    const board = [current, desired];

    test.advance(current, desired, board);

    const actual = test.position;
    const expected = [3, 0];

    expect(actual).toEqual(expected);
    expect(board[1].occupancy).toEqual(test);
    expect(board[0].occupancy).toBeNull();
  });
  it("should not be able to advance to an occupied square", function() {
    const test = new Pawn([4, 0], "white");
    const block = new Pawn([3, 0], 3, 0);
    const current = new Square(test, 4, 0);
    const desired = new Square(block, 3, 0);
    const board = [current, desired];

    test.advance(current, desired);

    const actual = test.position;
    const expected = [4, 0];
    expect(actual).toEqual(expected);
    expect(board[0].occupancy).toEqual(test);
    expect(board[1].occupancy).toEqual(block);
  });
  it("should be able to capture an opposing piece on on the primary diaganol one away", function() {
    const test = new Pawn([1, 1], "white");
    const opposition = new Pawn([0, 0], "black");
    const current = new Square(test, 1, 1);
    const desired = new Square(opposition, 0, 0);

    const board = [
      [desired, new Square(null, 0, 1)],
      [new Square(null, 1, 0), current]
    ];
    test.capture(current, desired, board);

    const actual = test.position;
    const expected = [0, 0];

    expect(actual).toEqual(expected);
    expect(board[0][0].occupancy).toEqual(test);
    expect(board[1][1].occupancy).toBeNull();
  });
  it("should not be able to capture an opposing piece on the primary diaganol two away", function() {
    const test = new Pawn([2, 2], "white");
    const opposition = new Pawn([0, 0], "black");
    const current = new Square(test, 0, 2);
    const desired = new Square(opposition, 0, 0);

    const board = [
      [desired, new Square(null, 0, 1), new Square(null, 0, 2)],
      [new Square(null, 1, 0), new Square(null, 1, 1), new Square(null, 1, 2)],
      [new Square(null, 2, 0), new Square(null, 2, 1), current]
    ];

    test.capture(current, desired, board);

    const actual = test.position;
    const expected = [2, 2];

    expect(actual).toEqual(expected);

    expect(board[0][0].occupancy).toEqual(opposition);
    expect(board[0][1].occupancy).toBeNull();
    expect(board[0][2].occupancy).toBeNull();
    expect(board[1][0].occupancy).toBeNull();
    expect(board[1][1].occupancy).toBeNull();
    expect(board[1][2].occupancy).toBeNull();
    expect(board[2][0].occupancy).toBeNull();
    expect(board[2][1].occupancy).toBeNull();
    expect(board[2][2].occupancy).toEqual(test);
  });
  it("should be able to capture an opposing piece on the secondary diagonal one square away", function() {
    const test = new Pawn([2, 0], "white");
    const opposition = new Pawn([1, 1], "black");
    const current = new Square(test, 2, 0);
    const desired = new Square(opposition, 1, 1);

    const board = [
      [new Square(null, 0, 0), new Square(null, 0, 1), new Square(null, 0, 2)],
      [new Square(null, 1, 0), desired, new Square(null, 1, 2)],
      [current, new Square(null, 2, 1), new Square(null, 2, 2)]
    ];

    test.capture(current, desired, board);

    const actual = test.position;
    const expected = [1, 1];

    expect(actual).toEqual(expected);
    expect(board[0][0].occupancy).toBeNull();
    expect(board[0][1].occupancy).toBeNull();
    expect(board[0][2].occupancy).toBeNull();
    expect(board[1][0].occupancy).toBeNull();
    expect(board[1][1].occupancy).toEqual(test);
    expect(board[1][2].occupancy).toBeNull();
    expect(board[2][0].occupancy).toBeNull();
    expect(board[2][1].occupancy).toBeNull();
    expect(board[2][2].occupancy).toBeNull();
  });
  it("should not be able to capture an opposing piece on the secondary diagnol two away", function() {
    const test = new Pawn([2, 0], "white");
    const opposition = new Pawn([0, 2], "black");
    const current = new Square(test, 2, 0);
    const desired = new Square(opposition, 0, 2);

    const board = [
      [new Square(null, 0, 0), new Square(null, 0, 1), desired],
      [new Square(null, 1, 0), new Square(null, 1, 1), new Square(null, 1, 2)],
      [current, new Square(null, 2, 1), new Square(null, 2, 2)]
    ];

    test.capture(current, desired, board);

    const actual = test.position;
    const expected = [2, 0];

    expect(actual).toEqual(expected);
    expect(board[0][0].occupancy).toBeNull();
    expect(board[0][1].occupancy).toBeNull();
    expect(board[0][2].occupancy).toEqual(opposition);
    expect(board[1][0].occupancy).toBeNull();
    expect(board[1][1].occupancy).toBeNull();
    expect(board[1][2].occupancy).toBeNull();
    expect(board[2][0].occupancy).toEqual(test);
    expect(board[2][1].occupancy).toBeNull();
    expect(board[2][2].occupancy).toBeNull();
  });
  it("should not be able to capture its own piece", function() {
    const test = new Pawn([2, 0], "white");
    const same = new Pawn([1, 1], "white");
    const current = new Square(test, 2, 0);
    const desired = new Square(same, 1, 1);

    const board = [
      [new Square(null, 0, 0), new Square(null, 0, 1), new Square(null, 0, 2)],
      [new Square(null, 1, 0), desired, new Square(null, 1, 2)],
      [current, new Square(null, 2, 1), new Square(null, 2, 2)]
    ];

    test.capture(current, desired, board);

    const actual = test.position;
    const expected = [2, 0];

    expect(actual).toEqual(expected);
    expect(board[0][0].occupancy).toBeNull();
    expect(board[0][1].occupancy).toBeNull();
    expect(board[0][2].occupancy).toBeNull();
    expect(board[1][0].occupancy).toBeNull();
    expect(board[1][1].occupancy).toEqual(same);
    expect(board[1][2].occupancy).toBeNull();
    expect(board[2][0].occupancy).toEqual(test);
    expect(board[2][1].occupancy).toBeNull();
    expect(board[2][2].occupancy).toBeNull();
  });
  it("should not be able to capture a piece in straight in front", function() {
    const test = new Pawn([2, 0], "white");
    const opposition = new Pawn([1, 0], "black");
    const current = new Square(test, 2, 0);
    const desired = new Square(opposition, 1, 0);

    const board = [
      [new Square(null, 0, 0), new Square(null, 0, 1), new Square(null, 0, 2)],
      [desired, new Square(null, 1, 1), new Square(null, 1, 2)],
      [current, new Square(null, 2, 1), new Square(null, 2, 2)]
    ];

    test.capture(current, desired, board);

    const actual = test.position;
    const expected = [2, 0];

    expect(actual).toEqual(expected);
    expect(board[0][0].occupancy).toBeNull();
    expect(board[0][1].occupancy).toBeNull();
    expect(board[0][2].occupancy).toBeNull();
    expect(board[1][0].occupancy).toEqual(opposition);
    expect(board[1][1].occupancy).toBeNull();
    expect(board[1][2].occupancy).toBeNull();
    expect(board[2][0].occupancy).toEqual(test);
    expect(board[2][1].occupancy).toBeNull();
    expect(board[2][2].occupancy).toBeNull();
  });
});
