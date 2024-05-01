import { InMemoryAnswersRepository } from '../repositories/in-memory/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import { makeAnswer } from '../factories/tests/make-answer'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from '../repositories/in-memory/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from '../factories/tests/make-answer-attachment'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    )
  })

  it('should be able to edit an answer', async () => {
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
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryAnswersRepository.answers[0]).toMatchObject({
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    })

    expect(
      inMemoryAnswersRepository.answers[0].attachments.currentItems,
    ).toHaveLength(2)

    expect(
      inMemoryAnswersRepository.answers[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  it('should sync new and removed attachments when editing an answer', async () => {
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

    const result = await sut.execute({
      answerId: 'answer-01',
      authorId: 'author-01',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      attachmentsIds: ['1', '3'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerAttachmentsRepository.answerAttachments).toHaveLength(
      2,
    )
    expect(inMemoryAnswerAttachmentsRepository.answerAttachments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),

        expect.objectContaining({
          attachmentId: new UniqueEntityId('3'),
        }),
      ]),
    )
  })

  it('should not be able to edit an answer of another user', async () => {
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
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
