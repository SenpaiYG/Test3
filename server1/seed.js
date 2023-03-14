const {client} = require ('./')
const {Movie} = require('../models/movies.js')
const {movies} = require ('./seedData.js')

const seed = async() => {
    await client.sync ({
        force: true
    })
    const createMovies = await Movie.bulkCreate(movies)
}

seed()