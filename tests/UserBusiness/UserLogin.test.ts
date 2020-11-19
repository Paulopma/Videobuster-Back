import { UserBusiness } from "../../src/business/UserBusiness"
import { User, UserLoginDTO } from "../../src/models/User"
import { UnauthorizedError } from "../../src/services/errors/UnauthorizedError"

let userDatabase = {}
let hashManager = {}
let idGenerator = {}
let tokenGenerator = {generate: jest.fn(()=> "token")}
describe('UserLogin tests', () => {
  
  describe('User inputs must match database in user login', () => {
    test("Should return 'Incorrect login or password' if provided password is incorrect", async () => {

      const getUserByEmail = jest.fn((email: string) => {
        return new User("id", "Paulo", "paulo@gmail.com", "123456")
      })
      
      const compare = jest.fn((password: string, userPassword: string) => false);

      userDatabase = {getUserByEmail}
      hashManager = {compare}
      
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
        
      try {
        await userBusiness.userLogin(user)

      } catch (error) {
        expect(error).toMatchObject(new UnauthorizedError("Incorrect login or password"))
        expect(getUserByEmail).toHaveBeenCalledWith("paulo@gmail.com");
        expect(compare).toHaveBeenCalledWith("654321", "123456");
      }
    })

    test("Should return 'Incorrect login or password' if provided e-mail is not found", async () => {

      const getUserByEmail = jest.fn((email: string) => {
        return undefined
      })
      
      const compare = jest.fn((password: string, userPassword: string) => false);

      userDatabase = {getUserByEmail}
      hashManager = {compare}
      
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashManager as any,
        idGenerator as any,
        tokenGenerator as any
      )
      const user: UserLoginDTO = {
        email: "paulo@gmail.com",
        password: "123456"
      }
        
      try {
        await userBusiness.userLogin(user)

      } catch (error) {
        expect(error).toMatchObject(new UnauthorizedError("Incorrect login or password"))
        expect(getUserByEmail).toHaveBeenCalledWith("paulo@gmail.com");
      }
    })
  })
})