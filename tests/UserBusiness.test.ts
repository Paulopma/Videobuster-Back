import { UserBusiness } from "d:/Programação/Labenu/my-frames-back/src/business/UserBusiness"
import { UserLoginDTO, UserSignupDTO } from "d:/Programação/Labenu/my-frames-back/src/models/User"

describe('UserBusiness tests', () => {
  let userDatabase = {}
  let hashManager = {}
  let tokenGenerator = {}
  let idGenerator = {}
  describe('User inputs must be valid in user signup', () => {
    test("Should return 'all fields required' if user doesn't fill name", async () => {
      try {
        const userBusiness = new UserBusiness(
          userDatabase as any,
          hashManager as any,
          idGenerator as any,
          tokenGenerator as any
        )
        const user: UserSignupDTO = {
          name: "",
          email: "paulo@gmail.com",
          nickname: "nullstrings",
          password: "123456"
        }

        await userBusiness.userSignup(user)

      } catch (error) {
        expect(error.message).toEqual("All fields are required")
      }
    })
  })
})