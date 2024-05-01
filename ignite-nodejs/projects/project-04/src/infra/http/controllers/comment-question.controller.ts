import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { z } from 'zod'
import { CommentQuestionUseCase } from '@/domain/forum/application/use-cases/comment-question'

const commentQuestionBodySchema = z.object({
  content: z.string(),
})

type CommentQuestionBodySchema = z.infer<typeof commentQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(commentQuestionBodySchema)

@Controller('/questions/:questionId/comments')
export class CommentQuestionController {
  constructor(private commentQuestion: CommentQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CommentQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const { sub: userId } = user

    const result = await this.commentQuestion.execute({
      authorId: userId,
      questionId,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
