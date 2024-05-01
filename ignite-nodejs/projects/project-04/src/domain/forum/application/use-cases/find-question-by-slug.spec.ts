import { InMemoryQuestionsRepository } from '../repositories/in-memory/in-memory-questions-repository'
import { FindQuestionBySlugUseCase } from './find-question-by-slug'
import { Slug } from '@/core/value-objects/slug'
import { makeQuestion } from '../factories/tests/make-question'
import { InMemoryQuestionAttachmentsRepository } from '../repositories/in-memory/in-memory-question-attachments-repository'
import { InMemoryAttachmentsRepository } from '../repositories/in-memory/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from '../repositories/in-memory/in-memory-students-repository'
import { makeStudent } from '../factories/tests/make-student'
import { makeAttachment } from '../factories/tests/make-attachment'
import { makeQuestionAttachment } from '../factories/tests/make-question-attachment'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FindQuestionBySlugUseCase

describe('Find Question By Slug Use Case', () => {
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
    sut = new FindQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to find a question by slug', async () => {
    const student = makeStudent({
      name: 'John Doe',
    })

    inMemoryStudentsRepository.students.push(student)

    const newQuestion = makeQuestion({
      authorId: student.id,
      slug: Slug.createFromText('lorem-ipsum'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const attachment = makeAttachment({
      title: 'Attachment 01',
    })

    inMemoryAttachmentsRepository.attachments.push(attachment)

    inMemoryQuestionAttachmentsRepository.questionAttachments.push(
      makeQuestionAttachment({
        attachmentId: attachment.id,
        questionId: newQuestion.id,
      }),
    )

    const result = await sut.execute({
      slug: 'lorem-ipsum',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        author: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: 'Attachment 01',
          }),
        ],
      }),
    })
  })
})
