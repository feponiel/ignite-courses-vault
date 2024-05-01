import { InMemoryAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/in-memory/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from '@/domain/forum/application/repositories/in-memory/in-memory-answers-repository'
import { OnAnswerCreated } from './on-answer-created'
import { makeAnswer } from '@/domain/forum/application/factories/tests/make-answer'
import { InMemoryQuestionsRepository } from '@/domain/forum/application/repositories/in-memory/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/in-memory/in-memory-question-attachments-repository'
import { makeQuestion } from '@/domain/forum/application/factories/tests/make-question'
import { InMemoryNotificationsRepository } from '../repositories/in-memory/in-memory-notifications-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { SpyInstance } from 'vitest'
import { waitFor } from './test/utils/wait-for'
import { InMemoryAttachmentsRepository } from '@/domain/forum/application/repositories/in-memory/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from '@/domain/forum/application/repositories/in-memory/in-memory-students-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
