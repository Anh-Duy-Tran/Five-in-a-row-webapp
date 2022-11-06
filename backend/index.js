const express = require('express');
const cors = require('cors');

const Tiles = require('./models/tiles');
const Logic = require('./logic/five-in-row');

let board = []

for (let i = 0; i < 50; i++) {
  let row = []
  for (let j = 0; j < 50; j++) {
    row.push(null);
  }
  board.push(row);
}

const app = express();

app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))

app.get('/api/board', (req, res) => {
  Tiles
    .find({})
    .then(tiles => {
      res.json(tiles)
    })
    .catch(console.log);
})

app.get('/server/board', (req, res) => {
  res.status(200).json(board);
})

app.post('/api/board', (req, res) => {
  const tile = req.body
  
  if (tile === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newTile = new Tiles({...tile})

  newTile.save().then(saved => {
    const win = Logic.addToBoard(board, saved.x, saved.y, saved.sign)
    res.json({saved, win : win})
  })
})

app.delete('/api/board', (req, res) => {
  Tiles
    .deleteMany({})
    .then(ret => {
      Logic.resetBoard(board);
      res.json(ret);
    })
    .catch(console.log)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})