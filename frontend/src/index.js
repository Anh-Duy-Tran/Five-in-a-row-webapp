import React from 'react';
import ReactDOM from 'react-dom/client'
import './App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const tileSize = 40;
const scale = 1.1;

const boardsize = {
  x : Math.ceil((window.innerWidth * scale) / tileSize),
  y : Math.ceil((window.innerHeight * scale) / tileSize),
}
const middlePoint = {
  x : Math.floor(boardsize.x / 2),
  y : Math.floor(boardsize.y / 2)
}

boardsize.middlePoint = middlePoint

document.body.classList.add("no-scroll")

root.render(<App boardsize={boardsize}/>);