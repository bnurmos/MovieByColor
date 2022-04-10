const {Movie,Feedback} = require('../models/movie');


const createFeedback = async (req,res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(200).send(
            `
            <head>
            <meta http-equiv="refresh" content="6; URL=/index.html" />
            </head>
            <body>
            <h2 style="text-align:center; margin-top:50px;">Thanks for your feedback!</h2>
            <p style="text-align:center; margin-top:100px;">
            <img src="200.gif" alt="Thanks for your feedback!" >
            </p>
            </body>
            `
        );
        
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error});
    }
};

const getAllMovies =  async (req, res) => {
    try{
        const movies = await Movie.find({});
        res.status(200).json({movies});
    } catch (error) {
        res.status(500).json({msg: error});
    }
    
    //res.status(200).json({status: 'success, data: {tasks, nbHits: tasks.length} });
};

const getMoviesByColor = async (req,res) => {
    try {
        //res.send('get single movie')
        const movieColor = req.params.color;
        const movies = await Movie.find({
            color:movieColor
        }).limit(3);
        // const movie = await Movie.find();
        if(movies.length==0){
            return res.status(404).json({msg: `No movie with color : ${movieColor}`});
        }
        let list = '';
        movies.forEach(m => {
            list+=`<li>${m.name}</li>`;
        });
        res.status(200).type('html').send(
            `
            <html><body>   
            <h3>${movieColor}</h3>
            <ul>
            ${list}
            </ul>
            </body></html>
            `);
    } catch (error){
        console.error(error);
        res.status(500).json({err: JSON.stringify(error)});
    }
};

const createMovie = async (req, res) => {
    try {
    const movie = await Movie.create(req.body)
    res.status(201).json({ movie })
  } catch (error) {
    res.status(500).json({msg: error});
  }
};

const deleteMovie = async (req, res, next) => {
    try {
    const { id: movieID } = req.params
    const movie = await Movie.findOneAndDelete({ _id: movieID })
    } catch (error) {
        res.status(500).json({msg: error});
    } if (!movie) {
      return next(createCustomError(`No movie with id : ${movieID}`, 404))
    }
    res.status(200).json({ movie })
  };

const updateMovie = async (req, res, next) => {
    try {
    const { id: movieID } = req.params
    const movie = await Movie.findOneAndUpdate({ _id: movieID }, req.body, {
      new: true,
      runValidators: true,
    })
    } catch (error) {
    res.status(500).json({msg: error});
    } if (!movie) {
      return next(createCustomError(`No movie with id : ${movieID}`, 404))
    }
  
    res.status(200).json({ movie })
  };

module.exports = {
    createFeedback, getMoviesByColor, getAllMovies, createMovie, deleteMovie, updateMovie
};