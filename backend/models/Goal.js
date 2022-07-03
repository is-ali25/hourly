const mongoose = require('mongoose')


const taskSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
})

const GoalSchema = mongoose.Schema( {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: false
    },
    hours: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    tasks: {
        type: [taskSchema],
        required: true,
        default: []
    }
})

module.exports = mongoose.model('Goal', GoalSchema)