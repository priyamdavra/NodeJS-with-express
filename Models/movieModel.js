const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        requried: [true, 'Name is required field!'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        requried: [true, 'Description is required field!'],
        trim: true
    },
    duration:{
        type: Number,
        required: [true,'Duration is required field!']
    },
    rating: {
        type: Number
    },
    totalRating:{
        type: Number
    },
    releaseYear:{
        type: Number,
        required: [true,'Release year is required field!']
    },
    releaseDate:{
        type: Date
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    genres:{
        type:[String],
        required: [true,'Genres is required field!']
    },
    director:{
        type:[String],
        required: [true,'Director is required field!']
    },
    coverImage:{
        type: String,
        required: [true,'Cover image is required field!']
    },
    actors:{
        type:[String],
        required: [true,'Actor is required field!']
    },
    price:{
        type: Number,
        required: [true,'Price is required field!']
    }
});

const Movie = new mongoose.model('Movie', movieSchema);

module.exports = Movie;