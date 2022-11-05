import './App.css';
import Row from './components/row';
import { useState } from 'react';

function App( { boardsize} ) {

  const { boardState, setBoardState } = useState([])

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

  return (
    <div className='Containter' onMouseMove={panMove}>
      <div className='Board'>
        {
          Array.from(Array(boardsize.x).keys()).map((x, i) => <Row key = {i} x={x} boardsize = {boardsize} ></Row>)
        }
      </div>
    </div>
  );
}

export default App;
