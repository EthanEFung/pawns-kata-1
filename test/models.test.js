const {
  renderBoard,
  initializeGame,
  Pawn,
  Square,
  spaceIsEmpty,
  positionIsOneAway
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

describe("spaceIsEmpty", function() {
  it("should render true if the position is open", function() {
    const current = new Square(new Pawn([4, 0], "white"), 4, 0);
    const desired = new Square(null, 3, 0);
    const test = spaceIsEmpty(desired);
    expect(test).toBeTruthy();
  });
  it("should render false if the position is occupied", function() {
    const current = new Square(new Pawn([4, 0], "white"), 4, 0);
    const desired = new Square(new Pawn([3, 0], "black"), 3, 0);
    const test = spaceIsEmpty(desired);
    expect(test).toBeFalsy();
  });
});

describe("positionIsOneAway", function() {
  it("should render the true for white pieces", function() {
    const current = new Square(null, 4, 0);
    const desired = new Square(null, 3, 0);
    const test = positionIsOneAway(current, desired, "white");
    expect(test).toBeTruthy();
  });
  it("should render true for black pieces", function() {
    const current = new Square(null, 0, 0);
    const desired = new Square(null, 1, 0);
    const test = positionIsOneAway(current, desired, "black");
    expect(test).toBeTruthy();
  });
  it("should throw and error if no side is provided to the position", function() {
    const current = new Square(null, 0, 0);
    const desired = new Square(null, 1, 0);
    const test = () => positionIsOneAway(current, desired);
    expect(test).toThrow("invalid side was provided ", undefined);
  });
});

describe("Pawn", function() {
  it("should keep track of the row and col, the pawn is currently on", function() {});
  it("should should know which side it is on", function() {});
  it("should be able to advance to an empty square", function() {});
  it("should not be able to advance to an occupied square", function() {});
  it("should be able to capture an opposing piece on on the primary diaganol one away", function() {});
  it("should not be able to capture an opposing piece on the primary diaganol two away", function() {});
  it("should be able to capture an opposing piece on the secondary diagonal one square away", function() {});
  it("should not be able to capture an opposing piece on the secondary diagnol three away", function() {});
  it("should not be able to capture its own piece", function() {});
  it("should not be able to capture a piece in straight in front", function() {});
});
