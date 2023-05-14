import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../configs/config.js'
import { badRequest, unauthorized } from '../utils/response.util.js'

const verifyAccessToken = async (req, res, next) => {
  if (!req.headers.authorization) return badRequest(res, 'Token is required')

  const token = req.headers.authorization.split('Bearer')[1].trim()

  if (!token) return badRequest(res, 'Token is required')

  try {
    jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return unauthorized(res, 'Token is invalid')
  }

  next()
}

export { verifyAccessToken }
