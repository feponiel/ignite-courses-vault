import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { FindQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/find-question-by-slug'
import { QuestionDetailsPresenter } from '../presenters/question-details-presenter'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

@Controller('/questions/:slug')
export class FindQuestionBySlugController {
  constructor(private findQuestionBySlug: FindQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.findQuestionBySlug.execute({ slug })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ResourceNotFoundError()
        default:
          throw new BadRequestException(error.message)
      }
    }

    const question = result.value.question

    return { question: QuestionDetailsPresenter.toHTTP(question) }
  }
}
