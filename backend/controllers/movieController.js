const asyncHandler = require('express-async-handler')

// @desc Get movies
// @route GET /api/movies
// @access Privet
const getMovies = asyncHandler(async (req, res) => {
    res.status(200).json({message : 'Get movies'})
})

// @desc Set movie
// @route Set /api/movies
// @access Privet
const setMovie = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400)
        throw new Error('Title is required')
    } else {
        res.status(200).json({message : `Set new movie: ${req.body.title}`})
    }
})

// @desc update movie
// @route put /api/movies/:id
// @access Privet
const updateMovie = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Update movie ${req.params.id}`})
})

// @desc delete movie
// @route delete /api/movies/:id
// @access Privet
const deleteMovie = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Delete movie ${req.params.id}`})
})

module.exports = {
    getMovies, setMovie, updateMovie, deleteMovie
}
