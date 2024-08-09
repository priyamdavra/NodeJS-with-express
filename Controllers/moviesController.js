const { query } = require('express');
const Movie = require('./../Models/movieModel');
const ApiFeatures = require('../Utils/ApiFeatures');

exports.getHighestRated = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratings';
    next();
};

exports.getallMovie = async (req, res) => {
    try {
        const features = new ApiFeatures(Movie.find(), req.query).filter().sort().limitFields().paginate();
        let movies = await features.query;
        // // Pagination   
        // const page = parseInt(req.query.page, 10) || 1;
        // const limit = parseInt(req.query.limit, 10) || 10;
        // const skip = (page - 1) * limit;

        // // Prepare query object (filters)
        // const queryObject = { ...req.query };
        // delete queryObject.page;
        // delete queryObject.limit;

        // // Count total documents with filters
        // const movieCount = await Movie.countDocuments(queryObject);
        // if (skip >= movieCount && movieCount > 0) {
        //     return res.status(404).json({
        //         status: 'fail',
        //         message: "This page is not found!"
        //     });
        // }

        // // Fetch movies with filters and pagination
        // const movies = await Movie.find(queryObject).skip(skip).limit(limit);

        res.status(200).json({
            status: 'success',
            length: movies.length,
            data: {
                movies
            }
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'fail',
            message: err.message
        });
    }
};


exports.getMovie = async (req,res) =>{
   //const movie = await Movie.find({_id: req.params.id});
   const movie = await Movie.findById(req.params.id);
try{
   res.status(200).json({
    status: 'success',
    data:{
        movie
    }
});
}catch(err){
    res.status(404).json({
        status: 'fail',
        message: err.message
    })
}
}

exports.createMovie = async (req,res) =>{
    try{
        const movie = await Movie.create(req.body);

        res.status(201).json({
            status: 'success',
            data:{
                movie
            }
        })
    }catch(err){
        res.status(401).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateMovie = async (req,res) =>{
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: 'success',
            data:{
                movie: updatedMovie
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}



exports.deleteMovie = async (req,res) =>{
    try{
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}