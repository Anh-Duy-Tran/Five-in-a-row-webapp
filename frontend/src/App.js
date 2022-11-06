import Row from './components/row';
import { useState, useEffect } from 'react';

import './App.css';
import boardServise from './service/board';

function App( { boardsize, midPoint } ) {

  const [ player, setPlayer ] = useState(0);
  const [ boardState, setBoardState ] = useState([]);

  const hook = () => {
    boardServise
      .getAll()
      .then(initBoard => setBoardState(initBoard))
      .catch(err => alert('fail'))
  }

  useEffect(hook, [])

  console.log(boardState);

  const panMove = (e) => {
    const board = e.currentTarget;
  
    const maxX = board.scrollWidth - window.innerWidth;
    const maxY = board.scrollHeight - window.innerHeight;
  
    const xDecimal = e.clientX / window.innerWidth;
    const yDecimal = e.clientY / window.innerHeight;
  
    const panX = maxX * -xDecimal;
    const panY = maxY * -yDecimal;

    board.animate({
      transform : `translate(${panX}px, ${panY}px)`
    }, {
      duration: 3000,
      easing : "ease"
    });
  }

  const tileOnClick = (e) => {
    const tile = e.currentTarget
    const newTile = {
      sign : player == 1 ? true : false,
      author : "Duy",
      x : Number(tile.getAttribute('x')),
      y : Number(tile.getAttribute('y'))
    }
    boardServise.create(newTile);
    tile.innerText = player ? 'X' : 'O';

    console.log(tile);

    setPlayer(player != 1 ? 1 : 0)
  }

  return (
    <div className='Containter' onMouseMove={panMove}>
      <div className='Board'>
        {
          Array.from(Array(boardsize.x).keys()).map((x, i) => 
            <Row key = {i} x={x} boardsize = {boardsize} onClick = {tileOnClick} boardState = {boardState} ></Row>)
        }
      </div>
    </div>
  );
}

export default App;
