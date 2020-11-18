import { MovieDatabase } from "../data/MovieDatabase";
import { AvailableMovieDTO, Movie } from "../models/Movie";
import { TokenGenerator } from "../services/tokenGenerator";

export class MovieBusiness {
  constructor(
    private movieDatabase: MovieDatabase,
    private tokenGenerator: TokenGenerator
  ){}
  
  async getAvailableMovies(token: string): Promise<AvailableMovieDTO[]> {
    try {
      await this.tokenGenerator.verify(token)
  
      const movieListDB = await this.movieDatabase.getAvailableMovies()

      const movieList: AvailableMovieDTO[] = []

      movieListDB.map((movie) => {
        if(movie.getAvailable()) {
          movieList.push({
            title: movie.getTitle(),
            director: movie.getDirector(),
            quantity: 1
          })
        }
      })

      if(movieList.length === 0) {
        throw Error ('There are no available movies at this time')
      }
      
      for(let i = 0; i < movieList.length; i++) {
        if(!movieList[i+1]) {
          break
        } 
        if(movieList[i].title === movieList[i+1].title) {
          movieList[i+1].quantity += movieList[i].quantity
        }
      }

      return movieList
        .sort((a, b) => b.quantity - a.quantity)
        .filter((v, i, a) => a.findIndex(t => (t.title === v.title)) === i)
        .sort((a:any, b:any) => a.title.localeCompare(b.title))
      
    } catch (error) {
      throw Error(error.message)
    } 
  }

  async rentByMovieId(movieId: string, token: string): Promise<void> {
    try {
      const userId = await this.tokenGenerator.verify(token)
      const movie: Movie = await this.movieDatabase.getMovieById(movieId)

      if(!movie.getAvailable()) {
        throw Error('movie not available')
      }

      await this.movieDatabase.rentByMovieId(movieId, userId)

    } catch (error) {
      throw Error(error.message)
    }
  }

  async returnByMovieId(movieId: string, token: string): Promise<void> {
    try {
      await this.tokenGenerator.verify(token)
      const movie: Movie = await this.movieDatabase.getMovieById(movieId)

      if(movie.getAvailable()) {
        throw Error('this movie is not rented')
      }

      await this.movieDatabase.returnByMovieId(movieId)

    } catch (error) {
      throw Error(error.message)
    }
  }

  async getMovieByTitle(movieTitle: string, token: string): Promise<Movie[]> {
    try {
      await this.tokenGenerator.verify(token)

      const movies: Movie[] = await this.movieDatabase.getMovieByTitle(movieTitle)

      movies.map((movie) => {
        movie.setAvailable(Boolean(Number(movie.getAvailable())))
      })

      return movies

    } catch (error) {
      throw Error(error.message)
    }
  }
}