import { Request, Response } from 'express'

import bcrypt from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'

import {
  JWT_SECRET,
  JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION,
} from '../constants/jwt'
import User from '../models/User'

/**
 * POST - register user
 * @description create new user if not exists in the database
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    // Check if the email exists
    const userExists = await User.findOne({
      where: { username },
    })

    if (userExists) {
      return res.status(400).send('This username has already taken')
    }

    await User.create({
      username,
      password: await bcrypt.hash(password, 15),
    })
    return res.status(200).send('Registration successful')
  } catch (err) {
    return res.status(500).send('Error in registering user')
  }
}

/**
 * POST - sign in
 * @description authenticate user
 */
export const signInUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({
      where: { username },
    })

    if (!user) {
      return res.status(404).json('Username not found')
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      return res.status(404).json('Incorrect username or password')
    }

    // Authenticate user with jwt

    // sign access token
    const accessToken = jwt.sign({ id: user.id, user: username }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_EXPIRATION,
    })

    // sign refresh token
    const refreshToken = jwt.sign({ id: user.id, user: username }, JWT_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRATION,
    })

    res
      .cookie('refreshToken', refreshToken)
      .header('Authorization', accessToken)
      .json({
        id: user.id,
        username: user.username,
        token: accessToken,
      })
  } catch (err) {
    return res.status(500).send('Sign in error')
  }
}

/**
 * POST - refresh token
 * @description refresh token
 */
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.['refreshToken']

  if (!refreshToken) {
    return res.status(401).send('Access Denied.')
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload

    if (!decoded?.id) {
      throw new Error('Failed to decode the token')
    }

    // sign new access token
    const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_EXPIRATION,
    })

    res
      .header('Authorization', accessToken)
      .json({ id: decoded.id, username: decoded.user, token: accessToken })
  } catch (error) {
    let errorMsg = 'Invalid refresh token.'

    if (error instanceof Error) {
      errorMsg = error.message
    }

    return res.status(400).send(error)
  }
}

/**
 * GET - logout
 * @description sign out user
 */
export const signOutUser = (req: Request, res: Response) => {
  res.removeHeader('Authorization')

  return res
    .clearCookie('refreshToken')
    .status(200)
    .json({ message: 'Successfully logged out' })
}
