const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));


//PARAM MIDDLEWARE USED
exports.checkId = (req, res, next, value) => {
    console.log('Movie id is : '+ value);

    let movieToUpdate = movies.find(el => el.id === value *1 );
    if(!movieToUpdate){
        return res.status(404).json({
             status: "fail",
             message : "No movie object with Id "+value+" is found"
         })
     }
    next();
}

exports.validateBody = (req, res, next) => {
    if(!req.body.name || !req.body.releseYear){
        return res.status(400).json({
            status : 'fail',
            message : 'Not a valid movie data'
        });
    }
    next();
}


//ROUTE HANDELER FUNCTION

exports.getallMovie =  (req,res) =>{
    res.status(200).json({
        status : "sucess",
        requestedAt : req.requestedAt,
        count : movies.length,
        data :{
            movies : movies
        }
    });
}

exports.getMovie = (req,res) =>{
    // console.log(req.params);

    //CONVERTING ID TO INTEGER TYPE
    const id = req.params.id * 1;

    //FIDN MOVIE BASED ON PARAMETER
    let movie = movies.find(el => el.id===id);

    if(!movie){
       return res.status(404).json({
            status: "fail",
            message : "Movie with Id "+id+" is not found"
        })
    }

    //SEND MOVIE IN THE RESPONCE
    res.status(200).json({
        status: "sucess",
        data :{
            movie : movie
        }
    });
}

exports.createMovie = (req,res) =>{
    const newId = movies[movies.length - 1].id +1;
    const newMovie = Object.assign({id : newId}, req.body)

    movies.push(newMovie);

    fs.writeFile('./data/movies.json',JSON.stringify(movies), (err) => {
        res.status(201).json({
            status : "sucess",
            data :{
                movies : newMovie
            }
        })
    })
}

exports.updateMovie = (req,res) =>{
    let id = req.params.id * 1;
    let movieToUpdate = movies.find(el => el.id===id);
    if(!movieToUpdate){
        return res.status(404).json({
             status: "fail",
             message : "No movie object with Id "+id+" is found"
         })
     }
    let index = movies.indexOf(movieToUpdate);

    Object.assign(movieToUpdate, req.body);
    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json',JSON.stringify(movies), (err) => {
        res.status(200).json({
            status : "sucess",
            data :{
                movie : movieToUpdate
            }
        })
    })
}


exports.deleteMovie = (req,res) =>{
    let id = req.params.id * 1;
    let movieToDelete = movies.find(el => el.id===id);
    if(!movieToDelete){
        return res.status(404).json({
             status: "fail",
             message : "No movie object with Id "+id+" is found for delete."
         })
     }
    const index = movies.indexOf(movieToDelete);
    
    movies.splice(index,1);

    fs.writeFile('./data/movies.json',JSON.stringify(movies), (err) => {
        res.status(200).json({
            status : "sucess",
            data :{
                movie : null
            }
        })
    })
}