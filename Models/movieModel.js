const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        requried: [true, 'Name is required field!'],
        unique: true
    },
    description: String,
    duration:{
        type: Number,
        required: [true,'Duration is required field!']
    },
    rating: {
        type: Number,
        default: 1.0
    }
});

const Movie = new mongoose.model('Movie', movieSchema);

module.exports = Movie;