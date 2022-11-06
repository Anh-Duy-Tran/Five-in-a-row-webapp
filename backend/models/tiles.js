require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL;

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