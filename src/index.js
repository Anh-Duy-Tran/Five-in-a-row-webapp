import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const tileSize = 40;
const scale = 1.5;
const boardsize = {
  x : Math.floor((window.innerWidth * scale) / tileSize),
  y : Math.floor((window.innerHeight * scale) / tileSize) - 1
}

root.render(<App boardsize={boardsize} />);