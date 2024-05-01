import { makeQuestion } from '../factories/tests/make-question'
import { InMemoryAnswersRepository } from '../repositories/in-memory/in-memory-answers-repository'
import { FetchAnswersUseCase } from './fetch-answers'
import { makeAnswer } from '../factories/tests/make-answer'
import { InMemoryAnswerAttachmentsRepository } from '../repositories/in-memory/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchAnswersUseCase

describe('Fetch Answers Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new FetchAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const question = makeQuestion()

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )

    const result = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch question answers by page', async () => {
    const question = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: question.id }),
      )
    }

    const result = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
