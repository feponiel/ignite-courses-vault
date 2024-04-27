import { InMemoryQuestionsRepository } from '../repositories/in-memory/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import { makeQuestion } from '../factories/tests/make-question'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from '../repositories/in-memory/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from '../factories/tests/make-question-attachment'
import { InMemoryAttachmentsRepository } from '../repositories/in-memory/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from '../repositories/in-memory/in-memory-students-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
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
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.questionAttachments.push(
      makeQuestionAttachment(
        { questionId: newQuestion.id },
        new UniqueEntityId('1'),
      ),
      makeQuestionAttachment(
        { questionId: newQuestion.id },
        new UniqueEntityId('2'),
      ),
    )

    await sut.execute({
      questionId: 'question-01',
      authorId: 'author-01',
    })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
    expect(
      inMemoryQuestionAttachmentsRepository.questionAttachments,
    ).toHaveLength(0)
  })

  it('should not be able to delete a question of another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-01',
      authorId: 'author-02',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
