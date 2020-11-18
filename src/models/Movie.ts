import { User } from "./User"

export class Movie {
  constructor(
    private id: string,
    private title: string,
    private director: string,
    private available: boolean
  ){}

  getId() {return this.id}
  getTitle() {return this.title}
  getDirector() {return this.director}
  getAvailable() {return this.available}

  setAvailable(available: boolean): void {
    this.available = available
  }

  static toMovieModel(movie: any): Movie {
    return new Movie (
      movie.id,
      movie.title,
      movie.director,
      movie.available
    )
  }
}

export interface AvailableMovieDTO {
  title: string
  director: string
  quantity: number 
}