const Movie = require('./../Models/movieModel');


exports.getallMovie = async (req,res) =>{
    try{
        const movies = await Movie.find();

        res.status(200).json({
            status: 'success',
            length: movies.length,
            data:{
                movies
            }
        })
    }catch(err){
        res.status(401).json({
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
    res.status(401).json({
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

exports.updateMovie = (req,res) =>{
   
}


exports.deleteMovie = (req,res) =>{
   
}