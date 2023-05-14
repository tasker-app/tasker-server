import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../configs/config.js'
import { badRequest } from '../utils/response.util.js'

const verifyAccessToken = async (req, res, next) => {
  const token = req.headers.authorization.split('Bearer')[1].trim()

  if (!token) return badRequest(res, 'Token is required')

  try {
    jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return badRequest(res, 'Token is invalid')
  }

  next()
}

export { verifyAccessToken }
