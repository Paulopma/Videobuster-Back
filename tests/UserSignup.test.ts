import { UserBusiness } from "../src/business/UserBusiness"
import { User, UserLoginDTO, UserSignupDTO } from "../src/models/User"
import { GenericError } from "../src/services/errors/GenericError"
import { InvalidParameterError } from "../src/services/errors/InvalidParameterError"
import { UnauthorizedError } from "../src/services/errors/UnauthorizedError"

describe('UserBusiness tests', () => {

  let userDatabase = {
    userSignup: jest.fn((user: User) => {}),
  }
  let hashManager = {
    hash: jest.fn(()=> "encryptedPassword")
  }
  let idGenerator = {generate: jest.fn(()=> "id")}
  let tokenGenerator = {generate: jest.fn(()=> "token")}

  describe('User inputs must be valid in user signup', () => {
    test("Should return error 'all fields required' if user doesn't fill name", async () => {
      expect.assertions(1);
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashManager as any,
        idGenerator as any,
        tokenGenerator as any
      )
      const user: UserSignupDTO = {
        name: "",
        email: "paulo@gmail.com",
        password: "123456"
      }
      try {
        await userBusiness.userSignup(user)

      } catch (error) {
        expect(error.message).toEqual("All fields are required")
      }
    })

    test("Should return 'Password must have at least six characters' if provided password is too small", async () => {
      expect.assertions(1);
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashManager as any,
        idGenerator as any,
        tokenGenerator as any
      )
      const user: UserSignupDTO = {
        name: "Paulo Aguiar",
        email: "paulo@gmail.com",
        password: "123"
      }
      try {
        await userBusiness.userSignup(user)

      } catch (error) {
        expect(error).toMatchObject(new InvalidParameterError("Password must have at least six characters"))
      }
    })

    test("Should return 'Invalid e-mail format' if provided e-mail is invalid", async () => {
      expect.assertions(1);
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashManager as any,
        idGenerator as any,
        tokenGenerator as any
      )
      const user: UserSignupDTO = {
        name: "Paulo Aguiar",
        email: "paulogmail.com",
        password: "123456"
      }
      try {

        await userBusiness.userSignup(user)

      } catch (error) {
        expect(error).toMatchObject(new InvalidParameterError('Invalid e-mail format'))
      }
    })
  })
})