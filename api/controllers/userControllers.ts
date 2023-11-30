import { Request, Response } from 'express'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    const JWT_SECRET = process.env.JWT_SECRET || 'random' // note: fixed fallback is security issue, but for this simple project this will do
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    })

    res.status(200).send({
      id: user.id,
      username,
      accessToken: token,
    })
  } catch (err) {
    return res.status(500).send('Sign in error')
  }
}
