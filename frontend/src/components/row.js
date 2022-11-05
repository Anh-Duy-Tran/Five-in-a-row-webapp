import Tile from './tile'

const Row = ( {x, boardsize} ) => {
  return (
    <div className='Row'> {
      Array.from(Array(boardsize.y).keys()).map((y,i) => <Tile key={i} x = {x} y = {y}></Tile>)
    } </div>
  )

}

export default Row