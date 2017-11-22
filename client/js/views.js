// story: render a 5x5 board with black and white positions

window.onload = () => {
  function transcribeBoard(matrix) {
    const $board = document.createElement("tbody");
    $board.setAttribute("id", "board");

    matrix.forEach((row, i) => {
      const $row = document.createElement("tr");
      $row.setAttribute("row", i);
      appendSpaces($row, row);
      $board.appendChild($row);
    });

    return document.body.appendChild($board);
  }

  function appendSpaces($row, row) {
    row.forEach((space, i) => {
      const $space = document.createElement("td");
      $space.setAttribute("class", "space");
      $space.setAttribute("row", $row.getAttribute("row"));
      $space.setAttribute("col", i);
      $space.addEventListener("click", function() {});
      if (space.occupancy !== null) {
        if (space.occupancy.side === "white") {
          $space.textContent = "X";
        } else {
          $space.textContent = "0";
        }
      }
      $row.appendChild($space);
    });
    return $row;
  }

  const board = renderBoard(5);
  initializeGame(board);
  transcribeBoard(board);
};
