require('dotenv').config()
const mongoose = require('mongoose')

const url = 'mongodb+srv://duyduy12321:Duyduymongo@cluster0.lznt26g.mongodb.net/five-in-a-row?retryWrites=true&w=majority';

const database = mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const tilesSchema = new mongoose.Schema({
  sign : {
    type: Boolean,
    require: true
  },
  author : {
    type : String,
    minLength: 5,
    required: true
  },
  x : {
    type : Number,
    required: true
  },
  y : {
    type : Number,
    required: true  
  }
})

module.exports = mongoose.model('Tiles', tilesSchema)