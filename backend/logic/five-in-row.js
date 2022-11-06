const resetBoard = (board) => {
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      board[i][j] = null;
    }
  }
}

const addToBoard = (board, x_, y_, sign) => {
  let x = x_ + 25;
  let y = y_ + 25;
  board[x][y] = sign ? 1 : 0;

  return checkWin(board, x, y);
}

const checkWin = (board, x, y) => {
  const directions = new Array ([1, 0], [0, 1], [1, 1], [1, -1])

  let winningLine = null;
  for (let i = 0; i < directions.length; i++) {
    let direction = directions[i];
    
    let loX = x;
    let loY = y;
    while (true) {
      if (board[loX - direction[0]][loY - direction[1]] === board[x][y])
      {
        loX -= direction[0];
        loY -= direction[1];
      } else {
        break;
      }
    }

    let highX = x;
    let highY = y;
    while (true) {
      if (board[ highX + direction[0] ][ highY + direction[1] ] === board[x][y])
      {
        highX += direction[0];
        highY += direction[1];
      } else {
        break;
      }
    }

    if (Math.max(Math.abs(highX - loX), Math.abs(highY - loY)) >= 4) {
      winningLine = {
        point1 : [loX - 25, loY - 25],
        point2 : [highX - 25, highY - 25]
      }
      break;
    }

  }
  return winningLine;
}

module.exports = { resetBoard, addToBoard }