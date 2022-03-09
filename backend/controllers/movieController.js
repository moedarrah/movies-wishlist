const asyncHandler = require('express-async-handler')

const Movie = require('../models/movieModel')

// @desc Get movies
// @route GET /api/movies
// @access Privet
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find()
  res.status(200).json(movies)
})

// @desc Set movie
// @route Set /api/movies
// @access Privet
const setMovie = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('Title is required')
  } else {
    const movie = await Movie.create({
      title: req.body.title,
      year: req.body.year,
    })
    res.status(200).json({ movie })
  }
})

// @desc update movie
// @route put /api/movies/:id
// @access Privet
const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if (!movie) {
    res.status(400)
    throw new Error('Movie not found')
  } else {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json(updatedMovie)
  }
})

// @desc delete movie
// @route delete /api/movies/:id
// @access Privet
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if (!movie) {
    res.status(400)
    throw new Error('Movie not found')
  } else {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: `Movie ${deletedMovie.title} deleted` })
  }
})

module.exports = {
  getMovies,
  setMovie,
  updateMovie,
  deleteMovie,
}
