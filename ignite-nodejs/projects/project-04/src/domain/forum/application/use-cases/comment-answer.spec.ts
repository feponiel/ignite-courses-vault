import { InMemoryAnswersRepository } from '../repositories/in-memory/in-memory-answers-repository'
import { CommentAnswerUseCase } from './comment-answer'
import { InMemoryAnswerCommentsRepository } from '../repositories/in-memory/in-memory-answer-comments-repository'
import { makeAnswer } from '../factories/tests/make-answer'
import { InMemoryAnswerAttachmentsRepository } from '../repositories/in-memory/in-memory-answer-attachments-repository'
import { InMemoryStudentsRepository } from '../repositories/in-memory/in-memory-students-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: CommentAnswerUseCase

describe('Comment Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new CommentAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment a answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-01',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerCommentsRepository.answerComments).toHaveLength(1)
  })
})
