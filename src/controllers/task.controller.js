import Task from '../models/task.model.js'
import { badRequest, internalServerError, success, unauthorized } from '../utils/response.util.js'
import taskUtil from '../utils/task.util.js'

const createTask = async (req, res) => {
  try {
    let { dueDate } = req.body
    const { name, description, priority } = req.body
    const { userId } = req

    if (!userId) return unauthorized(res, 'User ID is required')
    if (!name) return badRequest(res, 'Task name is required')
    if (!priority) return badRequest(res, 'Task priority is required')

    // if due date is not provided, set it to end of today, number format
    if (!dueDate) {
      dueDate = new Date()
      dueDate.setHours(23, 59, 59, 999)
    }

    const task = await taskUtil.createTask(userId, name, description, priority, dueDate)
    return success(res, task)
  } catch (error) {
    return internalServerError(res, `Cannot create task: ${error}`)
  }
}

const getAllTasks = async (req, res) => {
  try {
    const { userId } = req

    if (!userId) return unauthorized(res, 'User ID is required')

    const tasks = await Task.find({ userId })
    return success(res, tasks)
  } catch (error) {
    return internalServerError(res, `Cannot get all tasks: ${error}`)
  }
}

const getTaskById = async (req, res) => {
  try {
    const { userId } = req

    if (!userId) return unauthorized(res, 'User ID is required')

    const task = await Task.findById(req.params.id)
    if (!task) return badRequest(res, 'Task not found')

    return success(res, task)
  } catch (error) {
    return internalServerError(res, `Cannot get task by ID: ${error}`)
  }
}

const updateTask = async (req, res) => {
  try {
    const { userId } = req

    if (!userId) return unauthorized(res, 'User ID is required')

    const task = await Task.findById(req.params.id)

    if (!task) return badRequest(res, 'Task not found')

    const { name, description, priority, dueDate } = req.body

    if (name) task.name = name
    if (description) task.description = description
    if (priority) task.priority = priority
    if (dueDate) task.dueDate = dueDate

    await Task.findByIdAndUpdate(req.params.id, task, { new: true })

    return success(res, task)
  } catch (error) {
    return internalServerError(res, `Cannot update task: ${error}`)
  }
}

const deleteTask = async (req, res) => {
  try {
    const { userId } = req

    if (!userId) return unauthorized(res, 'User ID is required')

    const task = await Task.findById(req.params.id)

    if (!task) return badRequest(res, 'Task not found')

    await Task.findByIdAndDelete(req.params.id)

    return success(res, 'Delete task successfully')
  } catch (error) {
    return internalServerError(res, `Cannot delete task: ${error}`)
  }
}

export default { createTask, getAllTasks, getTaskById, updateTask, deleteTask }
