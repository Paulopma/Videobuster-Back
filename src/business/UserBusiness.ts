import { UserSignupDTO, User, UserLoginDTO } from "../models/User";
import { InvalidParameterError } from "../services/errors/InvalidParameterError";
import { IdGenerator } from "../services/idGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/hashManager";
import { TokenGenerator } from "../services/tokenGenerator";
import { UnauthorizedError } from "../services/errors/UnauthorizedError";
import { GenericError } from "../services/errors/GenericError";

export class UserBusiness {

  constructor(
    private userDatabase: UserDatabase,
    private hashManager: HashManager,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator
  ){}

  async userSignup(user: UserSignupDTO): Promise<string> {
    try {
      if(!user.email || !user.name || !user.password) {
        throw new GenericError('All fields are required')
      }
      
      if(user.password.length < 6) {
        throw new InvalidParameterError('Password must have at least six characters')
      }
  
      function validateEmail(email: string): boolean {
        const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return re.test(String(email).toLowerCase());
      }
  
      if(!validateEmail(user.email)) {
        throw new InvalidParameterError('Invalid e-mail format')
      }
  
      const id = this.idGenerator.generate()
      const encryptedPassword = await this.hashManager.hash(user.password)
      
      const newUser = new User(
        id,
        user.name,
        user.email,
        encryptedPassword
      )
  
      const token = this.tokenGenerator.generate({id: newUser.getId()})
      await this.userDatabase.userSignup(newUser)
      return token
    } catch (error) {
      throw Error(error.message || "Error creating user, send a zapt-zapt to your system administrator")
    }
  }
  
  async userLogin(userInput: UserLoginDTO): Promise<string> {
    try {
      const user = await this.userDatabase.getUserByEmail(userInput.email)
      let passwordPass = undefined
  
      if(user) {
        passwordPass = await this.hashManager.compare(userInput.password, user.getPassword())
      }
  
      if(!passwordPass || !user) {
        throw new UnauthorizedError("Incorrect login or password")
      }
  
      const token = this.tokenGenerator.generate({id: user.getId()})
      return token  
    } catch (error) {
      throw Error(error.message || "Error in user login, send a zapt-zapt to your system administrator")
    }
  }

  async userLogout(token: string): Promise<void> {
    try {
    const tokenId = await this.tokenGenerator.verify(token)
    await this.tokenGenerator.destroy(tokenId)
      
    } catch (error) {
      throw Error(error.message)
    }
  }
}