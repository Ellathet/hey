import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import io from 'socket.io'
import { AuthenticateMiddleware } from './middlewares/authenticate.middleware'
import { Router } from './routes'

// start dot env
dotenv.config()

const app = express()
const server = http.createServer(app)
const socket = new io.Server(server)

// logger middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// security options for http
app.use(helmet())

// request body parser
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

// cors options
app.use(cors())

// authenticate socket middleware
socket.use(AuthenticateMiddleware.authenticateSocket)

// put socket in express app
app.set('socket', socket)

// socket connection
socket.on('connection', (s) => {
  console.log(`SOCKET connection ${s.id}`)
  s.send('you are connected')
  s.on('disconnect', () => {
    console.log(`SOCKET disconnect ${s.id}`)
  })
})

app.use('/api', Router)

server.listen(3025, () => console.log('Running in 3025'))
