import { Notification, Prisma } from '@prisma/client'
import { prisma } from '../services/prisma.service'

const create = async (notificationData: Prisma.NotificationCreateInput): Promise<Notification> => {
  const createdNotification = await prisma.notification.create({
    data: notificationData
  })

  return createdNotification
}

const selectAll = async (options?: Prisma.NotificationFindManyArgs): Promise<Notification[]> => {
  const selectedStories = await prisma.notification.findMany(options)

  return selectedStories
}

export const NotificationRepository = {
  create,
  selectAll
}
