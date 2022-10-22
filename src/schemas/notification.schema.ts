import * as yup from 'yup'

export const NotificationSendSchema = yup.object({
  body: yup.object({
    title: yup.string().min(3).max(50).required(),
    text: yup.string().min(3).max(1000).required()
  })
})
