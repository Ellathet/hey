import express from 'express'

import { router as NotificationRoutes } from '../controllers/notification.controller'

const Router = express.Router()

Router.use('/notification', NotificationRoutes)

export { Router }
