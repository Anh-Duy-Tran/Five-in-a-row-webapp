let board = Array.from(Array(50), () => new Array(50))

const resetBoard = (board) => {
  board = Array.from(Array(50), () => new Array(50))
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

    console.log(direction);
    console.log(Math.abs(highX - loX));
    if (Math.max(Math.abs(highX - loX), Math.abs(highY - loY)) >= 4) {
      winningLine = {
        point1 : [loX, loY],
        point2 : [highX, highY]
      }
      break;
    }

  }
  return winningLine;
}

module.exports = { board, resetBoard, addToBoard }