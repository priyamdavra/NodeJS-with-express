const Movie = require('./../Models/movieModel');


exports.getallMovie = async (req,res) =>{
    try{
        console.log(req.query)
        const movies = await Movie.find(req.query);

        res.status(200).json({
            status: 'success',
            length: movies.length,
            data:{
                movies
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

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