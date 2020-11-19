import express from "express"
import { MovieController } from "../controllers/MovieController"

export const movieRouter = express.Router()

movieRouter.get('/available', new MovieController().getAvailableMovies)
movieRouter.put('/rent/:id', new MovieController().rentByMovieId)
movieRouter.put('/return/:id', new MovieController().returnByMovieId)
movieRouter.get('/search/:title', new MovieController().getMovieByTitle)