const inBound = (bound1, bound2, point) => {
  return bound1[0] <= point[0] && bound2[0] >= point[0];
}

const inLine = (bound1, bound2, point) => {
  if (!inBound(bound1, bound2, point)) {
    return false;
  }

  if (point[0] === bound1[0] && point[1] === bound1[1]) {
    return true;
  }

  let vec1 = [point[0] - bound1[0], point[1] - bound1[1]]
  let vec2 = [bound2[0] - bound1[0], bound2[1] - bound1[1]]

  vec1 = [vec1[0] / Math.max(...vec1), vec1[1] / Math.max(...vec1)]
  vec2 = [vec2[0] / Math.max(...vec2), vec2[1] / Math.max(...vec2)]

  console.log(vec1, vec2);
  return vec1[0] === vec2[0] && vec1[1] === vec2[1]
}

const Tile = ( {x, y, boardsize, boardState, onClick, win} ) => {
  x -= boardsize.middlePoint.x
  y -= boardsize.middlePoint.y

  let isWinTile = false
  let sign = ''
  const point = [x, y]
  const isChecked = boardState.tiles.find(tile => tile.x === x && tile.y === y)
  if (isChecked) {
    if (isChecked.sign) {
      if (win.x !== null && inLine(win.x.point1, win.x.point2, point)) {
        isWinTile = true;
      }
      sign = 'X'
    } else {
      if (win.o !== null && inLine(win.o.point1, win.o.point2, point)) {
        isWinTile = true;
      }
      sign = 'O'
    }
  }

  let className = 'Tile' + (sign === '' ? '' : ' ' + sign) + (isWinTile ? (' Win' + sign) : '');
  if (win.x !== null && inLine(win.x.point1, win.x.point2, point)) {
    className += " WinX";
  }
  
  if (win.o !== null && inLine(win.o.point1, win.o.point2, point)) {
    className += " WinO";
  }

  return (
    <div onClick={onClick} key = {10*x + y} className={className} x = {x} y = {y} clicked = {sign !== '' ? 1 : 0}>
      {sign}
    </div>
  )
} 

export default Tile