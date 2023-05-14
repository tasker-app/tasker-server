import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    _id: String,
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true
    },
    username: {
      type: String,
      required: [true, 'Username is required!'],
      trim: true
    },
    avatar: {
      type: String,
      trim: true
    },
    plan: {
      type: String,
      trim: true,
      required: [true, 'Plan is required!']
    },
    refreshToken: {
      type: String,
      trim: true
    }
  },
  {
    versionKey: false
  }
)

export default mongoose.model('User', userSchema)
