import io from 'socket.io'
import { getEnv } from '../utils/env'
import httpStatus from 'http-status'

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

export const AuthenticateMiddleware = {
  authenticateSocket
}
