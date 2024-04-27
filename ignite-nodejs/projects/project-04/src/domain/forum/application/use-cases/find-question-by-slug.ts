import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'
import { QuestionDetails } from '@/core/value-objects/question-details'

interface FindQuestionBySlugUseCaseRequest {
  slug: string
}

type FindQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  { question: QuestionDetails }
>

export class FindQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: FindQuestionBySlugUseCaseRequest): Promise<FindQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findDetailsBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
