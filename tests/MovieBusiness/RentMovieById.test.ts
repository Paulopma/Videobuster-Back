import { MovieBusiness } from "../../src/business/MovieBusiness"
import { Movie } from "../../src/models/Movie"

let movieDatabase = {}
let tokenGenerator = {verify: jest.fn((token)=> "id")}
let userDatabase = {}
describe('Movie rent tests', () => {
  
  test("Should return 'movie not available' if movie column rented_to is not null", async () => {

    const getMovieById = jest.fn((movieId: string) => {
      return new Movie("4", "Amadeus", "Nolan", "user")
    })

    const rentByMovieId = jest.fn((movieId: string, userId: string) => {
      return null
    })

    const movieId = "4"
    const token = "token"

    movieDatabase = {getMovieById, rentByMovieId}

    const movieBusiness = new MovieBusiness(
      movieDatabase as any,
      tokenGenerator as any,
      userDatabase as any
    )
      
    try {
      await movieBusiness.rentByMovieId(movieId, token)

    } catch (error) {
      expect(error).toMatchObject(Error('movie not available'))
      expect(getMovieById).toHaveBeenCalledWith("4");
      expect(rentByMovieId).toHaveBeenCalled;
    }
  })
})