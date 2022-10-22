import express, { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ErrorTypes } from '../@types/error.types'
import { ISendNotificationDTO } from '../@types/notification.types'
import { NOTIFICATION_ACTIONS } from '../constants/actions.constants'
import { errorHandler } from '../middlewares/error_handler.middleware'
import { validator } from '../middlewares/validatior_handler.middleware'
import { NotificationSendSchema } from '../schemas/notification.schema'
import { NotificationService } from '../services/notification.service'

const router = express.Router()

router.post('/',
  validator(NotificationSendSchema, NOTIFICATION_ACTIONS.send_notification),
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const {
        title,
        text
      }: ISendNotificationDTO = request.body

      const socket = request.app.get('socket')

      await NotificationService.send({ title, text }, socket)

      return response.sendStatus(httpStatus.OK)
    } catch (error) {
      const e = error as ErrorTypes
      return await errorHandler(e, request, response)
    }
  })

router.get('/',
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const foundNotifications = await NotificationService.getAll()

      return response.status(httpStatus.OK).json(foundNotifications)
    } catch (error) {
      const e = error as ErrorTypes
      return await errorHandler(e, request, response)
    }
  }
)

export { router }
