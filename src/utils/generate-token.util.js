import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../configs/config.js'

const generateToken = (email, username, id) => {
  try {
    const payload = {
      email,
      username,
      id
    }

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h'
    })

    const refreshToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d'
    })

    return {
      accessToken,
      refreshToken
    }
  } catch (error) {
    throw new Error(`Cannot generate token: ${error}`)
  }
}

export { generateToken }
