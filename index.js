import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

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

// SWAGGER CONFIG
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasker API with Swagger',
      version: '1.0.0',
      description: 'Tasker API with Swagger',
      contact: {
        name: 'Tasker API'
      },
      servers: [
        {
          url: 'http://localhost:3001'
        }
      ]
    }
  },
  apis: ['./src/docs/schemas.js']
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs, { explorer: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
