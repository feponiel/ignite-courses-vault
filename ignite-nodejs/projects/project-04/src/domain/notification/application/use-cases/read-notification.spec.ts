import { ReadNotificationUseCase } from './read-notification'
import { InMemoryNotificationsRepository } from '../repositories/in-memory/in-memory-notifications-repository'
import { makeNotification } from '../factories/tests/make-notification'
import { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification Use Case', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification of another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityId('recipient-01'),
    })

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-02',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
