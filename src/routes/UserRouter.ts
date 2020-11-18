import express from "express"
import { UserController } from "../controllers/UserController"

export const userRouter = express.Router()

userRouter.post('/signup', new UserController().userSignup)
userRouter.get('/login', new UserController().userLogin)
userRouter.get('/logout', new UserController().userLogout)