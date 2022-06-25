const mongoose = require('mongoose')
const Goal = require('./models/Goal')
const express = require('express')
const cors = require('cors')
require('body-parser')
require('dotenv').config()

//initiate server
const app = express()
const port = 5100

//middleware
app.use(cors())
app.use(express.json())

// //connect to database
mongoose.connect('mongodb+srv://IsAli:Nacho!25@cluster0.7mqyc.mongodb.net/thoughtMetadata', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.once('open', () => {console.log('successfully connected to MongoDB database')})

//routes
app.get('/', async (req, res) => {
    try {
        const Thoughts = await Goal.find()
        res.status(200).json(Thoughts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

app.post('/add', async (req, res) => {
    console.log("request has been received")
    const newThought = new Goal(req.body)
    try {
        await newThought.save()
        console.log('successful post request')
        res.status(201).json(newThought)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//start server
app.listen(port, () => console.log(`server is listening on port ${port}`))