import Tile from './tile'

const Row = ( { x, boardsize, onClick, boardState } ) => {
  return (
    <div className='Row'> {
      Array.from(Array(boardsize.y).keys()).map((y,i) => 
        <Tile key={i} x = {x} y = {y} boardsize = {boardsize} onClick = {onClick} boardState = {boardState} ></Tile>)
    } </div>
  )

}

export default Row