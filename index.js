import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import routes from './src/routes.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const MONGO_URI = process.env.MONGO_URI

mongoose.set('strictQuery', true)

const connectWithRetry = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((error) => {
      console.log(error)
      setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: ['*']
  })
)

routes(app)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
