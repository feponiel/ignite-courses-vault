import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationsRepository } from '../repositories/in-memory/in-memory-notifications-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification Use Case', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '01',
      title: 'Lorem Ipsum',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.notifications[0]).toEqual(
      result.value?.notification,
    )
  })
})
