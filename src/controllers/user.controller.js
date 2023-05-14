import { sha256 } from 'js-sha256'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import { generateToken } from '../utils/generate-token.util.js'
import { badRequest, internalServerError, success } from '../utils/response.util.js'
import userUtil from '../utils/user.util.js'

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body

    if (!email) return badRequest(res, 'Email is required')
    if (!password || password.length < 8) return badRequest(res, 'Password is not valid')
    if (!username) return badRequest(res, 'Username is required')

    const user = await userUtil.createUser(email, password, username)
    return success(res, user)
  } catch (error) {
    return internalServerError(res, `Cannot register: ${error}`)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email) return badRequest(res, 'Email is required')
    if (!password) return badRequest(res, 'Password is required')

    // get user by email and check the password is match or not
    const user = await userUtil.getUserByEmail(email)

    if (!user) return badRequest(res, 'Email or password is incorrect')
    else {
      const hashedPassword = sha256(password)
      const isPasswordMatch = user.password === hashedPassword

      if (!isPasswordMatch) return badRequest(res, 'Email or password is incorrect')

      const { accessToken, refreshToken } = generateToken(user.email, user.username)

      // update refresh token to database
      await User.findOneAndUpdate(
        {
          email
        },
        {
          refreshToken
        },
        {
          new: true
        }
      )

      return success(res, {
        accessToken,
        refreshToken,
        user
      })
    }
  } catch (error) {
    return internalServerError(res, `Cannot login: ${error}`)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    return success(res, users)
  } catch (error) {
    return internalServerError(res, `Cannot get all users: ${error}`)
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    return success(res, user)
  } catch (error) {
    return internalServerError(res)
  }
}

const getRetrieveToken = async (req, res) => {
  const refreshToken = req.headers['x-refresh-token']

  try {
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const { email, username } = decodedRefreshToken

    try {
      const user = await userUtil.getUserByEmail(email)
      const { accessToken, refreshToken } = generateToken(email, username)

      // update refresh token to database
      await User.findOneAndUpdate(
        {
          email
        },
        {
          refreshToken
        },
        {
          new: true
        }
      )

      return success(res, {
        accessToken,
        refreshToken,
        user
      })
    } catch (error) {
      return internalServerError(res, `Cannot get user by email: ${error}`)
    }
  } catch (error) {
    return internalServerError(res, `Cannot verify refresh token: ${error}`)
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { password, username } = req.body

    const user = await User.findById(id)

    if (!user) return badRequest(res, 'User is not found')

    await User.findByIdAndUpdate(id, {
      password: password ? sha256(password) : user.password,
      username: username || user.username
    })

    user.password = password ? sha256(password) : user.password
    user.username = username || user.username

    return success(res, user)
  } catch (error) {
    return internalServerError(res, `Cannot update user: ${error}`)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    await User.findByIdAndDelete(id)
    return success(res, 'Delete user successfully')
  } catch (error) {
    return internalServerError(res, `Cannot delete user: ${error}`)
  }
}

// module.exports = {
//   register,
//   login,
//   getAllUsers,
//   getUserById,
//   getRetrieveToken,
//   updateUser,
//   deleteUser,
// }

export default {
  register,
  login,
  getAllUsers,
  getUserById,
  getRetrieveToken,
  updateUser,
  deleteUser
}
