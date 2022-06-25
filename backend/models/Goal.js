const mongoose = require('mongoose')

const GoalSchema = mongoose.Schema( {
    id: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('Goal', GoalSchema)