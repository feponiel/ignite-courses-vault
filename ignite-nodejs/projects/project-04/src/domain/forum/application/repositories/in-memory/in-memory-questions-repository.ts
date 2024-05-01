import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../questions-repository'
import { PaginationParams } from '@/domain/forum/application/repositories/types/pagination-params'
import { DomainEvents } from '@/core/events/domain-events'
import { InMemoryStudentsRepository } from './in-memory-students-repository'
import { InMemoryAttachmentsRepository } from './in-memory-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachments-repository'
import { QuestionDetails } from '@/core/value-objects/question-details'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private studentsRepository: InMemoryStudentsRepository,
  ) {}

  async create(question: Question) {
    this.questions.push(question)

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findById(id: string) {
    const question = this.questions.find(
      (question) => question.id.toString() === id,
    )

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )

    if (!question) {
      return null
    }

    return question
  }

  async findDetailsBySlug(slug: string) {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )

    if (!question) {
      return null
    }

    const author = this.studentsRepository.students.find(
      (student) => student.id === question.authorId,
    )

    if (!author) {
      throw new Error(
        `Author with id "${question.authorId.toString()}" does not exist!`,
      )
    }

    const questionAttachments =
      this.questionAttachmentsRepository.questionAttachments.filter(
        (questionAttachment) => questionAttachment.questionId === question.id,
      )

    const attachments = questionAttachments.map((questionAttachment) => {
      const attachment = this.attachmentsRepository.attachments.find(
        (attachment) => attachment.id.equals(questionAttachment.attachmentId),
      )

      if (!attachment) {
        throw new Error(
          `Attachment with id "${questionAttachment.attachmentId.toString()}" does not exist!`,
        )
      }

      return attachment
    })

    return QuestionDetails.create({
      questionId: question.id,
      authorId: question.authorId,
      author: author.name,
      title: question.title,
      slug: question.slug,
      content: question.content,
      bestAnswerId: question.bestAnswerId,
      attachments,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    })
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question) {
    const questionIndex = this.questions.findIndex(
      (item) => item.id === question.id,
    )

    this.questions[questionIndex] = question

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getNewItems(),
    )

    await this.questionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question) {
    const questionIndex = this.questions.findIndex(
      (item) => item.id === question.id,
    )

    this.questions.splice(questionIndex, 1)

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
