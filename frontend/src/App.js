import Row from './components/row';
import { useState, useEffect } from 'react';

import './App.css';
import boardServise from './service/board';

function App( { boardsize } ) {

  const [ player, setPlayer ] = useState(0);
  const [ gameOver, setGameOver ] = useState(false);
  const [ win, setWin ] = useState({
      x : null,
      o: null
    })
  const [ boardState, setBoardState ] = useState({
    tiles : Array(0),
    win : {
      x : null,
      o: null
    }
  });

  const hook = () => {
    boardServise
      .getAll()
      .then(initBoard => {
        if (initBoard.win.x !== null || initBoard.win.o !== null) {
          setGameOver(true);
          setWin({...initBoard.win})
        }
        setBoardState(initBoard);
      })
      .catch(err => alert('fail'))
  }

  useEffect(() => {
    setInterval(hook, 1000);
  }, [])

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

    if (Number(tile.getAttribute('clicked')) === 1 || gameOver) {
      return;
    }
    const newTile = {
      sign : player === 1 ? true : false,
      author : "Duy",
      x : Number(tile.getAttribute('x')),
      y : Number(tile.getAttribute('y'))
    }
    tile.innerText = player ? 'X' : 'O';
    
    tile.setAttribute('clicked', 1);
    tile.setAttribute('sign', tile.innerText);
    tile.classList.add(player ? 'X' : 'O');
    
    setPlayer(player !== 1 ? 1 : 0);
    boardServise.create(newTile).then(res => {
      if (res.win.x !== null || res.win.o !== null)
      {
        setGameOver(true);
        setWin(res.win);
        console.log("reach here");
      }
    });
  }

  return (
    <div className='Containter' onMouseMove={panMove}>
      <div className='Board'>
        {
          Array.from(Array(boardsize.x).keys()).map((x, i) => 
            <Row key = {i} x={x} boardsize = {boardsize} onClick = {tileOnClick} boardState = {boardState} win = {win}></Row>)
        }
      </div>
    </div>
  );
}

export default App;
