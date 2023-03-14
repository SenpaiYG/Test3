require('dotenv').config();
const express = require('express')
const app = express ()
const { movies } = require('./server1/seedData')
const {Movie} = require('./models/movies')
app.use(express.json());


const {auth, requiresAuth} = require('express-openid-connect')


app.use (
    auth ({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.secret
    })
)


app.get('/movies', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/testing', (req, res) => {
    res.send("Gello123")
})


app.get('/movies',requiresAuth(), async (req, res, next) => {
    try {

        const movies = await Movie.findAll();
        res.send(movies);
      } catch (error) {
        console.error(error);
        next(error)
      }
})

app.get('/movies/name',requiresAuth(), async (req, res, next) => {

  try {
      const movies = await Movie.findOne({
        where: {
          movie: req.body.movie
        }
      });

      res.send(movies);
    } catch (error) {
      console.error(error);
      next(error)
    }
})

app.get('/movies/:id',requiresAuth(), async (req, res, next) => {
  try {

      const singleMovie = await Movie.findOne({
        where:{
          id: req.params.id
        }
      });
      res.send(singleMovie);
    } catch (error) {
      console.error(error);
      next(error)
    }
})

app.post('/movies/name/description',requiresAuth(), async (req, res, next) => {

  try {
      const singleMovie = await Movie.create({

          movie: req.body.movie,
          description: req.body.description

      });
      res.status(200).send(singleMovie);
    } catch (error) {
      console.error(error);
      next(error)
    }
})

app.put('/movies/name/description/:id',requiresAuth(), async (req, res, next) => {
  try {
      const singleMovie = await Movie.update(
        req.body,{
        where:{
          id: req.params.id
        }
      });
      res.send(singleMovie);
    } catch (error) {
      console.error(error);
      next(error)
    }
})

module.exports = app; 