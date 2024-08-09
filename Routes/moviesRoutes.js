const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();
//router.param('id', moviesController.checkId);

//router.route('/highest-rated').get(moviesController.getHighestRated, moviesController.getallMovie)

router.route('/')
    .get(moviesController.getallMovie)
    .post(moviesController.createMovie) // Chaning multiple middleware

router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = router;