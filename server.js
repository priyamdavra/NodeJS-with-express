const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

console.log(process.env);

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser: true
}).then((conn) => {
    //console.log(conn);
    console.log('DB Connection Sucessful');
}).catch((error) => {
    console.log('Some error has occured.')
});

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

const testMovie = new Movie({
    name: "Intersteller",
    description: "A thriller sci-fi movie with space, advanture and great action.",
    duration: 180,
    
});

testMovie.save()
.then(doc => {
console.log(doc);
})
.catch(err => {
    console.log('Error occured : ' + err);
});

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log('Server has started...');
}) 