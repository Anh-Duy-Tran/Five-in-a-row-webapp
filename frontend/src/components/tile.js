const Tile = ( {x, y, boardsize, boardState, onClick} ) => {
  
  x -= boardsize.middlePoint.x
  y -= boardsize.middlePoint.y

  let sign = ''
  const isChecked = boardState.find(tile => tile.x === x && tile.y === y)
  if (isChecked) {
    if (isChecked.sign) {
      sign = 'X'
    } else {
      sign = 'O'
    }
  }

  return (
    <div onClick={onClick} key = {10*x + y} className='Tile' x = {x} y = {y}>
      {sign}
    </div>
  )
} 

export default Tile