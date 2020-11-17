import express from "express"
import {userRouter} from "./routes/UserRouter"
import {AddressInfo} from "net";
import dotenv from "dotenv"

dotenv.config()
const app = express()
app.use(express.json())

app.use("/user", userRouter)

const server = app.listen(3003, () => {
  if(server) {
    const address = server.address() as AddressInfo
    console.log(`Server running in http://localhost:${address.port}`)
  } else {
    console.error(`Couldn't initialize server.`)
  }
})

