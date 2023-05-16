import { v4 as uuid } from 'uuid'

import Task from '../models/task.model.js'

const createTask = async (userId, name, description, priority, dueDate) => {
  try {
    const task = await Task.create({
      _id: uuid(),
      userId,
      name,
      description,
      priority,
      dueDate
    })
    return task
  } catch (error) {
    throw new Error(`Cannot create task: ${error}`)
  }
}

export default { createTask }
