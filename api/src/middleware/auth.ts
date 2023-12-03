import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JWT_ACCESS_EXPIRATION, JWT_SECRET } from '../constants/jwt'

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split('Bearer')?.at(-1)?.trim()
  const refreshToken = req.cookies?.['refreshToken']

  if (!accessToken) {
    return res.sendStatus(403)
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as JwtPayload

    if (!decoded.id || !decoded.user) {
      throw new Error('Access token expires')
    }
    return next()
  } catch {
    if (!refreshToken) {
      return res.status(401).send('Access Denied.')
    }

    // try decode refresh token
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload

      if (!decoded?.id) {
        throw new Error('Failed to decode the token')
      }

      // sign new access token
      const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_EXPIRATION,
      })

      res.header('Authorization', accessToken)
      return next()
    } catch (err) {
      console.error(err)
      return res.status(401).send('Invalid Token.')
    }
  }
}

export default authorization
