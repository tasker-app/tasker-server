import express from 'express'

import taskController from '../controllers/task.controller.js'
import { verifyAccessToken } from '../middlewares/auth.middleware.js'

const taskRouter = express.Router()

// all routes are required auth
// get all tasks
taskRouter.get('/', verifyAccessToken, taskController.getAllTasks)

// create task
taskRouter.post('/', verifyAccessToken, taskController.createTask)

// get task by ID
taskRouter.get('/:id', verifyAccessToken, taskController.getTaskById)

// update task
taskRouter.put('/:id', verifyAccessToken, taskController.updateTask)

// delete task
taskRouter.delete('/:id', verifyAccessToken, taskController.deleteTask)

export default taskRouter
