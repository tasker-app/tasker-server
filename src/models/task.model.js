import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    _id: String,
    userId: {
      type: String,
      required: [true, 'User ID is required!'],
      trim: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, 'Task name is required!'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    priority: {
      type: String, // low, medium, high or default
      trim: true
    },
    dueDate: {
      type: Date,
      trim: true
    }
  },
  {
    versionKey: false
  }
)

export default mongoose.model('Task', taskSchema)
