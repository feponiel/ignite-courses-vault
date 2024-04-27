import { InMemoryAnswersRepository } from '../repositories/in-memory/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from '../repositories/in-memory/in-memory-answer-comments-repository'
import { makeAnswer } from '../factories/tests/make-answer'
import { makeAnswerComment } from '../factories/tests/make-answer-comment'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from '../repositories/in-memory/in-memory-answer-attachments-repository'
import { InMemoryStudentsRepository } from '../repositories/in-memory/in-memory-students-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete an answer comment', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.answerComments).toHaveLength(0)
  })

  it('should not be able to delete an answer comment of another user', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-01'),
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)

    const result = await sut.execute({
      authorId: 'author-02',
      answerCommentId: answerComment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
