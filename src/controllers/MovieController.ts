import { Request, Response } from 'express'
import { MovieBusiness } from "../business/MovieBusiness";
import { MovieDatabase } from "../data/MovieDatabase";
import { TokenGenerator } from "../services/tokenGenerator";

export class MovieController {
  private static movieBusiness = new MovieBusiness(
    new MovieDatabase(),
    new TokenGenerator()
  )

  async getAvailableMovies(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const moviesList = await MovieController.movieBusiness.getAvailableMovies(token)

      res.status(200).send(moviesList)
    } catch (error) {
      res.status(400).send({error: error.message})
    }
  }

  async rentByMovieId(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const movieId = req.params.id

      await MovieController.movieBusiness.rentByMovieId(movieId, token)
      res.status(200).send({message: "movie rented successfuly"})
    } catch (error) {
      res.status(400).send({error: error.message})
    }
  }

  async returnByMovieId(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const movieId = req.params.id

      await MovieController.movieBusiness.returnByMovieId(movieId, token)

      res.status(200).send({message: "movie returned successfuly"})
    } catch (error) {
      res.status(400).send({error: error.message})
    }
  }

  async getMovieByTitle(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const movieTitle = req.params.title

      const movies = await MovieController.movieBusiness.getMovieByTitle(movieTitle, token)

      res.status(200).send(movies)
    } catch (error) {
      res.status(400).send({error: error.message})
    }
  }
}