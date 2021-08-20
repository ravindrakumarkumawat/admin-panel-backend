const path = require('path')
const mongoose = require("mongoose")
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') })

const URI = `mongodb+srv://admin-db:P4h4bp6LfN86YGeZ@cluster0.25d5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
  console.log(`Mongoose is connected...`);
})

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
})