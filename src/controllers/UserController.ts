import { Response, Request } from "express"
import { UserSignupDTO, UserLoginDTO } from "../models/User"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../data/UserDatabase"
import { HashManager } from "../services/hashManager"
import { IdGenerator } from "../services/idGenerator"
import { TokenGenerator } from "../services/tokenGenerator"
import { BaseDatabase } from "../data/BaseDatabase"

export class UserController {
  private static userBusiness = new UserBusiness(
    new UserDatabase(), 
    new HashManager(), 
    new IdGenerator(), 
    new TokenGenerator()
  )
  
  async userSignup(req: Request, res: Response): Promise<void> {
    try {
      const {name, email, password} = req.body
      const user: UserSignupDTO = {
        name,
        email,
        password
      }

      const token = await UserController.userBusiness.userSignup(user)

      res.status(200).send({message: "User created successfuly", token})
    } catch (error) {
      res.status(400).send({error: error.message || "Error creating new user, contact your system administrator"})
    }
    await BaseDatabase.destroyConnection()
  }

  async userLogin(req: Request, res: Response): Promise<void> {
    try {
      const userInput: UserLoginDTO = {
        email: req.body.email,
        password: req.body.password
      }

      const token = await UserController.userBusiness.userLogin(userInput)

      res.status(200).send({message: 'User successfuly logged in', token})
    } catch (error) {
      res.status(400).send({error: error.message || "Error in user login, contact your system administrator"})
    }
    await BaseDatabase.destroyConnection()
  }

  async userLogout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      await UserController.userBusiness.userLogout(token)
      
      res.status(200).send({message: 'User successfuly logged out'})
    } catch (error) {
      res.status(400).send({error: error.message || "Error in user logout, contact your system administrator"})
    }
    await BaseDatabase.destroyConnection()
  }
}