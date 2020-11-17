import { BaseDatabase } from "./BaseDatabase";
import { User } from "../models/User";

export class UserDatabase extends BaseDatabase {
  tableUser = "Videobuster_User"

  async userSignup(user: User): Promise<void> {
    try {
      await this.getConnection().insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword()
      }).into(this.tableUser)
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.getConnection().raw(`
        SELECT * FROM ${this.tableUser}
        WHERE email = "${email}"
      `)

      if(!user[0][0]) {
        return
      }
      
      return User.toUserModel(user[0][0])
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.getConnection().raw(`
        SELECT * FROM ${this.tableUser}
        WHERE id = "${id}"
      `)
      return User.toUserModel(user[0][0])
    } catch (error) {
      throw new Error(error.sqlmessage || error.message)
    }
  }
}