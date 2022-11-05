import './App.css';
import Row from './components/row';

function App( { boardsize} ) {

  const panMove = (e) => {
    const board = e.target;

    const mouseX = e.clientX,
          mouseY = e.clientY;
  
    const maxX = 1920 - window.innerWidth;
    const maxY = 840 - window.innerHeight;
  
    const xDecimal = mouseX / window.innerWidth;
    const yDecimal = mouseY / window.innerHeight;
  
    const panX = maxX * -xDecimal;
    const panY = maxY * -yDecimal;
  
    board.style.transform = `translate(${panX}px, ${panY}px)`;
  }

  return (
    <div onMouseMove={panMove}>
      <div className='Board'>
        {
          Array.from(Array(boardsize.x).keys()).map((x, i) => <Row key = {i} x={x} boardsize = {boardsize} ></Row>)
        }
      </div>
    </div>
  );
}

export default App;
