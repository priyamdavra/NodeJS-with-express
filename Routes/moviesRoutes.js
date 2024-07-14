const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();

router.route('/')
    .get(moviesController.getallMovie)
    .post(moviesController.createMovie)

router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = router;