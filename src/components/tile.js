const Tile = ( {x, y} ) => {

  const tileOnClick = (e) => {
    console.log(x, y);
  }

  return (
    <div onClick={tileOnClick} key = {10*x + y} className='Tile'></div>
  )
} 

export default Tile