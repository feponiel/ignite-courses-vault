import { InMemoryAnswersRepository } from '../repositories/in-memory/in-memory-answers-repository'
import { makeAnswer } from '../factories/tests/make-answer'
import { InMemoryAnswerCommentsRepository } from '../repositories/in-memory/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '../factories/tests/make-answer-comment'
import { InMemoryAnswerAttachmentsRepository } from '../repositories/in-memory/in-memory-answer-attachments-repository'
import { InMemoryStudentsRepository } from '../repositories/in-memory/in-memory-students-repository'
import { makeStudent } from '../factories/tests/make-student'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments Use Case', () => {
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
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch the comments of an answer', async () => {
    const student = makeStudent({ name: 'John Doe' })

    inMemoryStudentsRepository.students.push(student)

    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    const comment1 = makeAnswerComment({
      answerId: answer.id,
      authorId: student.id,
    })

    const comment2 = makeAnswerComment({
      answerId: answer.id,
      authorId: student.id,
    })

    const comment3 = makeAnswerComment({
      answerId: answer.id,
      authorId: student.id,
    })

    await inMemoryAnswerCommentsRepository.create(comment1)
    await inMemoryAnswerCommentsRepository.create(comment2)
    await inMemoryAnswerCommentsRepository.create(comment3)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
  })

  it('should be able to fetch the comments of an answer by page', async () => {
    const student = makeStudent()

    inMemoryStudentsRepository.students.push(student)

    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: answer.id, authorId: student.id }),
      )
    }

    const result = await sut.execute({
      answerId: answer.id.toString(),
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
