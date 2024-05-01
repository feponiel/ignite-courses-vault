import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { z } from 'zod'
import { FetchAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-answers'
import { AnswerPresenter } from '../presenters/answer-presenter'

const pageQueryParamsShema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsShema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsShema)

@Controller('/questions/:questionId/answers')
export class FetchAnswersController {
  constructor(private fetchAnswers: FetchAnswersUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchAnswers.execute({ page, questionId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answers = result.value.answers

    return { answers: answers.map(AnswerPresenter.toHTTP) }
  }
}
