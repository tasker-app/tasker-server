import { sha256 } from 'js-sha256'
import { v4 as uuid } from 'uuid'

import User from '../models/user.model.js'

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    })

    return user
  } catch (error) {
    throw new Error(`Cannot get user by email: ${error}`)
  }
}

const createUser = async (email, password, username) => {
  try {
    const getUser = await getUserByEmail(email)
    if (getUser !== null) {
      throw new Error('Email is already in use')
    }

    const user = await User.create({
      _id: uuid(),
      email,
      password: sha256(password),
      avatar: '',
      username,
      plan: 'free',
      refreshToken: ''
    })
    return user
  } catch (error) {
    throw new Error(`Cannot create user: ${error}`)
  }
}

export default {
  createUser,
  getUserByEmail
}
