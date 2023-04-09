// import express

const express = require('express')
const mongoose = require('mongoose')
const router = require('./backend/routes/routes')
app = express()

const port = process.env.port || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/todos', router)

app.listen(port, () => {
  console.log(`App is running on port ${port}, press Ctrl+C to Terminate.`)
})
