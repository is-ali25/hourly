const mongoose = require('mongoose')
require('dotenv').config()
const Goal = require('./models/Goal')
const express = require('express')
const cors = require('cors')
require('body-parser')

//initiate server
const app = express()
const port = process.env.PORT || 5100

//middleware
app.use(cors())
app.use(express.json())

const URL = process.env.DB_CONNECTION
// console.log(URL)

// //connect to database
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(error =>{
        console.log(error)
        throw Error("DB connection problem")
    })
    
const connection = mongoose.connection
connection.once('open', () => {console.log('successfully connected to MongoDB database')})

//routes
app.get('/', async (req, res) => {
    try {
        const Goals = await Goal.find()
        res.status(200).json(Goals)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

app.post('/add', async (req, res) => {
    console.log("received post request")
    console.log(req.body)
    const newGoal = new Goal(req.body)
    try {
        await newGoal.save()
        console.log('successful post request')
        res.status(201).json(newGoal)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.put('/task-update/:id', async (req, res) => {
    console.log(`${req.params.id}: ${req.body.description}`)
    try {
        await Goal.updateOne({_id: req.params.id}, {$push: {"tasks": req.body}})
        .then(updated => res.json(updated))
        console.log('successful put request')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.put('/toggle/:id', async (req, res) => {
    console.log(`${req.params.id}\n ${req.body._id}\n`)
    try {
        const goal = await Goal.findOne({_id: req.params.id})
        console.log(goal.tasks)
        goal.tasks.forEach(task => {
            if (task.description === req.body.description) {
                console.log(`match\n`)
                task.completed = !task.completed
            }
        })
        console.log(goal.tasks)
        await Goal.updateOne({_id: req.params.id}, {$set: {"tasks": goal.tasks}})
        .then(updated => res.json(updated))
        .catch(err => console.error(err))
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.put('/delete-task/:id', async (req, res) => {
    console.log(`starting delete function`)
    console.log(`${req.params.id}\n ${req.body._id}\n`)
    try {
        let goal = await Goal.findOne({_id: req.params.id})
        console.log(goal.tasks)
        goal.tasks.forEach(task => {
            if (task.description === req.body.description) {
                console.log(`match\n`)
                goal.tasks = goal.tasks.filter((t) => {return t.description != req.body.description})
            }
        })
        console.log(goal.tasks)
        await Goal.updateOne({_id: req.params.id}, {$set: {"tasks": goal.tasks}})
        .then(updated => res.json(updated))
        .catch(err => console.error(err))
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.put('/goal-update/:id', async (req, res) => {
    console.log(`updating goal ${req.params.id}`)
    try {
        await Goal.updateOne({_id: req.params.id}, {$set: {"tasks" : req.body.tasks}})
        .then(updated => res.json(updated))
        console.log('successful put request')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.put('/update-hours/:id', async (req, res) => {
    console.log(req.body)
    console.log(`incrementing hours for ${req.params.id}`)
    try {
        let goal = await Goal.findOne({_id: req.params.id})
        goal.hours = req.body
        await Goal.updateOne({_id: req.params.id}, {$set: {"hours" : goal.hours}})
        .then(updated => res.json(updated))
        console.log('successfully updated hours')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.put('/increment/:id', async (req, res) => {
    console.log(`incrementing hours for ${req.params.id}`)
    try {
        let goal = await Goal.findOne({_id: req.params.id})
        goal.hours++
        await Goal.updateOne({_id: req.params.id}, {$set: {"hours" : goal.hours}})
        .then(updated => res.json(updated))
        console.log('successful increment')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.put('/decrement/:id', async (req, res) => {
    console.log(`decrementing hours for ${req.params.id}`)
    try {
        let goal = await Goal.findOne({_id: req.params.id})
        goal.hours--
        await Goal.updateOne({_id: req.params.id}, {$set: {"hours" : goal.hours}})
        .then(updated => res.json(updated))
        console.log('successful decrement')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.put('/addTime/:id', async (req, res) => {
    console.log(`adding ${req.body.time} seconds to ${req.params.id}`)
    try {
        let goal = await Goal.findOne({_id: req.params.id})
        let hours = parseFloat(goal.hours)
        hours += (req.body.time/3600)
        console.log(hours)
        goal.hours = hours
        console.log(goal.hours)
        await Goal.updateOne({_id: req.params.id}, {$set: {"hours" : hours}})
        .then(updated => res.json(updated))
        console.log('successfully added hours')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.delete('/delete-goal/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        await Goal.deleteOne({_id: req.params.id})
        .then(updated => res.json(updated))
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})



//start server
app.listen(port, () => console.log(`server is listening on port ${port}`))