const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false
    },
    important: {
        type: Boolean,
        default: false
    },
    range: {
        type: Number,
        min: 0,
        max: 5,
        immutable: true
    },
    tags: {
        type: [String]
    },
    type: String,
    icon: {
        type: String,
        maxLength: 7
    },
    taskDate: {
        type: mongoose.Schema.Types.Date,
        default: () => new Date() + 7 * 24 * 60 * 60 * 1000
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)