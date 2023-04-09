// import express

const express = require('express')
const mongoose = require('mongoose')
const router = require('./backend/routes/routes')
app = express()

const port = process.env.port || 5000

// Send the contents of the .env file to the process.env object
require('dotenv').config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/todos', router)

app.listen(port, () => {
  console.log(`App is running on port ${port}, press Ctrl+C to Terminate.`)
})
