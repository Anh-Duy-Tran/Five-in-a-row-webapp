const express = require('express');
const cors = require('cors');

const Board = require('./models/board');

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

// app.use(express.static('build'))

app.get('/api/board', (req, res) => {
  Board
    .find({})
    .then(board => {
      res.json(board)
    })
    .catch(console.log);
})

app.post('/api/board', (req, res) => {
  const tile = req.body
  
  if (tile === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newPerson = new Board({...person})

  newPerson.save().then(saved => res.json(saved))
})

const unknownEndpoint = (req, res) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})