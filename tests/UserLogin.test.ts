import { UserBusiness } from "../src/business/UserBusiness"
import { User, UserLoginDTO } from "../src/models/User"
import { UnauthorizedError } from "../src/services/errors/UnauthorizedError"

// getUserByEmail: jest.fn((email: string)=>{User})
let userDatabase = {}
let hashManager = {}
let idGenerator = {}
let tokenGenerator = {generate: jest.fn(()=> "token")}
describe('UserLogin tests', () => {
  
  describe('User inputs must be valid in user signup', () => {
    test("Should return 'Invalid e-mail format' if provided e-mail is invalid", async () => {
      // expect.assertions(1);
      // const getUserByEmail = jest.fn((email: string) => {
      //   return new User("id", "Paulo", "paulo@gmail.com", "123456")
      // });

      const getUserByEmail = jest.fn((email: string) => {
        return new User("id", "Paulo", "paulo@gmail.com", "123456")
      })
      
      const compare = jest.fn((password: string, userPassword: string) => false);
      
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashManager as any,
        idGenerator as any,
        tokenGenerator as any
      )
      const user: UserLoginDTO = {
        email: "paulo@gmail.com",
        password: "654321"
      }
        
      userDatabase = {getUserByEmail}
      hashManager = {compare}
      try {
        await userBusiness.userLogin(user)

      } catch (error) {
        expect(error).toMatchObject(new UnauthorizedError("Incorrect login or password"))
        expect(getUserByEmail).toHaveBeenCalledWith("paulo@gmail.com");
        expect(compare).toHaveBeenCalledWith("654321", "123456");
      }
    })
  })
})