const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    year: {
        type: Number,
        required: false
    },},
    {
        timestamps: true
        })

        module.exports = mongoose.model('Movie', movieSchema)

