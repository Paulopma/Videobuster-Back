import { User, UserDisplayDTO } from "./User"

export class Movie {
  constructor(
    private id: string,
    private title: string,
    private director: string,
    private rentedTo: string | null | UserDisplayDTO
  ){}

  getId() {return this.id}
  getTitle() {return this.title}
  getDirector() {return this.director}
  getRentedTo() {return this.rentedTo}

  setRentedTo(rentedTo: UserDisplayDTO) {
    this.rentedTo = rentedTo
  }

  static toMovieModel(movie: any): Movie {
    return new Movie (
      movie.id,
      movie.title,
      movie.director,
      movie.rented_to
    )
  }
}

export interface AvailableMovieDTO {
  title: string
  director: string
  quantity: number 
}