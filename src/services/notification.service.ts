import { ISendNotificationDTO } from '../@types/notification.types'
import io from 'socket.io'
import { NotificationRepository } from '../repositories/notification.repository'
import { Notification } from '@prisma/client'

const send = async ({
  title,
  text
}: ISendNotificationDTO, socket: io.Server): Promise<void> => {
  const createdNotification = await NotificationRepository.create({
    title,
    text,
    sentAt: new Date()
  })

  socket.emit('notification', createdNotification)
}

const getAll = async (): Promise<Notification[]> => {
  const selectedNotification = await NotificationRepository.selectAll()

  return selectedNotification
}

export const NotificationService = {
  send,
  getAll
}
