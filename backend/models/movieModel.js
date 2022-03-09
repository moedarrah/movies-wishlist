const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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

