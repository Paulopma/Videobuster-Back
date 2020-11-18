import { Movie } from "../models/Movie";
import { BaseDatabase } from "./BaseDatabase";

export class MovieDatabase extends BaseDatabase {
  tableMovie = "Videobuster_Movie"
  tableRented = "Videobuster_Rented"

  async getAvailableMovies(): Promise<Movie[]> {
    try {
      const availableMoviesDB = await this.getConnection().raw(`
        SELECT * FROM ${this.tableMovie}
        ORDER BY title ASC
      `)
      const availableMovies: Movie[] = []

      availableMoviesDB[0].map((movie: Movie) => {
        availableMovies.push(Movie.toMovieModel(movie))
      })

      return availableMovies
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }

  async getMovieById(movieId: string): Promise<Movie> {
    try {
      const movie = await this.getConnection().raw(`
        SELECT * FROM ${this.tableMovie} 
        WHERE id = "${movieId}"
      `)
      return Movie.toMovieModel(movie[0][0])
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }

  async rentByMovieId(movieId: string, userId: string): Promise<void> {
    try {
      await this.getConnection().raw(`
        UPDATE ${this.tableMovie} 
        SET available = false
        WHERE id = "${movieId}"
      `)
      await this.getConnection().insert({
        user_id: userId,
        movie_id: movieId,
      }).into(this.tableRented)
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }

  async returnByMovieId(movieId: string): Promise<void> {
    try {
      await this.getConnection().raw(`
        UPDATE ${this.tableMovie} 
        SET available = true
        WHERE id = "${movieId}"
      `)
      await this.getConnection()
        .del()
        .where("movie_id", movieId)
        .into(this.tableRented)
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }

  async getMovieByTitle(movieTitle: string): Promise<Movie[]> {
    try {
      const moviesDB = await this.getConnection().raw(`
        SELECT * FROM ${this.tableMovie} 
        WHERE title LIKE "%${movieTitle}%"
      `)

      const movies: Movie[] = []

      if(moviesDB[0].length === 0) {
        throw Error('movie not found')
      }

      moviesDB[0].map((movie: Movie) => {
        movies.push(Movie.toMovieModel(movie))
      })

      return movies
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }
}
