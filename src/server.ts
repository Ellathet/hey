import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

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

app.listen(3025, () => console.log(3025))
