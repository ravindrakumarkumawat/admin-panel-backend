const path = require('path')
const express = require('express')
const cors = require('cors')
require('./models/db/connectDB')

const userRouter = require('./routes/user')

const app = express()
const port = process.env.PORT || 4500;
app.use(express.json())
app.use(cors())

app.use("/api/v1", userRouter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})