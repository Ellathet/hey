import io from 'socket.io'
import { getEnv } from '../utils/env'
import httpStatus from 'http-status'
import { Request, Response, NextFunction } from 'express'

const authenticateSocket = (
  s: io.Socket,
  next: (err?: Error | undefined) => void): void => {
  const token = s.handshake.auth.token
  if (token === getEnv('APP_TOKEN')) {
    next()
  } else {
    next(new Error(httpStatus['403_NAME']))
  }
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
const authenticateHttp = (request: Request, response: Response, next: NextFunction): void | Response => {
  if (request.headers.authorization !== undefined) {
    const token = request.headers.authorization.split(' ')

    if (token[1] === getEnv('APP_TOKEN')) {
      return next()
    }
  }
  return response.status(httpStatus.UNAUTHORIZED).json({
    message: httpStatus['401_MESSAGE'],
    status: httpStatus.UNAUTHORIZED
  })
}

export const AuthenticateMiddleware = {
  authenticateSocket,
  authenticateHttp
}
