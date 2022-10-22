import { ISendNotificationDTO } from '../@types/notification.types'
import io from 'socket.io'

const send = async ({
  title,
  text
}: ISendNotificationDTO, socket: io.Server): Promise<void> => {
  socket.emit('notification', { title, text })
}

export const NotificationService = {
  send
}
