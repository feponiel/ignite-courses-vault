import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { NotificationsRepository } from '../notifications-repository'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = []

  async create(notification: Notification) {
    this.notifications.push(notification)
  }

  async findById(id: string) {
    const notification = this.notifications.find(
      (notification) => notification.id.toString() === id,
    )

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification) {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    )

    this.notifications[notificationIndex] = notification
  }
}
