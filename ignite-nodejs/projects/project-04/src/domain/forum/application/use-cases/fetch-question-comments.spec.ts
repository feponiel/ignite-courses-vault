import { InMemoryQuestionsRepository } from '../repositories/in-memory/in-memory-questions-repository'
import { makeQuestion } from '../factories/tests/make-question'
import { InMemoryQuestionCommentsRepository } from '../repositories/in-memory/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from '../factories/tests/make-question-comment'
import { InMemoryQuestionAttachmentsRepository } from '../repositories/in-memory/in-memory-question-attachments-repository'
import { InMemoryStudentsRepository } from '../repositories/in-memory/in-memory-students-repository'
import { makeStudent } from '../factories/tests/make-student'
import { InMemoryAttachmentsRepository } from '../repositories/in-memory/in-memory-attachments-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch the comments of a question', async () => {
    const student = makeStudent({ name: 'John Doe' })

    inMemoryStudentsRepository.students.push(student)

    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    const comment1 = makeQuestionComment({
      questionId: question.id,
      authorId: student.id,
    })

    const comment2 = makeQuestionComment({
      questionId: question.id,
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      questionId: question.id,
      authorId: student.id,
    })

    await inMemoryQuestionCommentsRepository.create(comment1)
    await inMemoryQuestionCommentsRepository.create(comment2)
    await inMemoryQuestionCommentsRepository.create(comment3)

    const result = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment1.id,
        }),

        expect.objectContaining({
          author: 'John Doe',
          commentId: comment2.id,
        }),

        expect.objectContaining({
          author: 'John Doe',
          commentId: comment3.id,
        }),
      ]),
    )
  })

  it('should be able to fetch the comments of a question by page', async () => {
    const student = makeStudent({ name: 'John Doe' })

    inMemoryStudentsRepository.students.push(student)

    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: question.id, authorId: student.id }),
      )
    }

    const result = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
