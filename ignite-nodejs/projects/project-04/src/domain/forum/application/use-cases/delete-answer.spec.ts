import { InMemoryAnswersRepository } from '../repositories/in-memory/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import { makeAnswer } from '../factories/tests/make-answer'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from '../repositories/in-memory/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from '../factories/tests/make-answer-attachment'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('answer-01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.answerAttachments.push(
      makeAnswerAttachment({ answerId: newAnswer.id }, new UniqueEntityId('1')),
      makeAnswerAttachment({ answerId: newAnswer.id }, new UniqueEntityId('2')),
    )

    await sut.execute({
      answerId: 'answer-01',
      authorId: 'author-01',
    })

    expect(inMemoryAnswersRepository.answers).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.answerAttachments).toHaveLength(
      0,
    )
  })

  it('should not be able to delete an answer of another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('answer-01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer-01',
      authorId: 'author-02',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
