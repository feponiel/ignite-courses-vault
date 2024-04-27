import { InMemoryQuestionsRepository } from '../repositories/in-memory/in-memory-questions-repository'
import { CommentQuestionUseCase } from './comment-question'
import { InMemoryQuestionCommentsRepository } from '../repositories/in-memory/in-memory-question-comments-repository'
import { makeQuestion } from '../factories/tests/make-question'
import { InMemoryQuestionAttachmentsRepository } from '../repositories/in-memory/in-memory-question-attachments-repository'
import { InMemoryAttachmentsRepository } from '../repositories/in-memory/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from '../repositories/in-memory/in-memory-students-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentQuestionUseCase

describe('Comment Question Use Case', () => {
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
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new CommentQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment a question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionId: question.id.toString(),
      authorId: 'author-01',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionCommentsRepository.questionComments).toHaveLength(1)
  })
})
