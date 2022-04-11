const express = require('express');
const router = express.Router();

const {createFeedback, getMoviesByColor, getAllMovies, createMovie, updateMovie} = require ('../consrollers/movies')


// router.route('/api/v1/tasks').get(getAllTasks).post(createTask);
// router.route('/api/v1/tasks/:id').get(getTask).patch(updateTask).delete(deleteTask);


router.route('/feedback').post(createFeedback);
// router.route('/movie').get(getAllMovies);
router.route('/movies/:color').get(getMoviesByColor);
router.route('/movie/:movieID').post(createMovie).patch(updateMovie);



module.exports = router;
