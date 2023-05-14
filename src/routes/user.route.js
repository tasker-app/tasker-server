import express from 'express'

import userController from '../controllers/user.controller.js'
import { verifyAccessToken } from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

// get all users, require auth
userRouter.get('/', verifyAccessToken, userController.getAllUsers)

// register
userRouter.post('/register', userController.register)

// login
userRouter.post('/login', userController.login)

// get user by id
userRouter.get('/:id', userController.getUserById)

// update user by id
userRouter.put('/:id', userController.updateUser)

// retrieve new token
userRouter.post('/refresh', userController.getRetrieveToken)

export default userRouter
