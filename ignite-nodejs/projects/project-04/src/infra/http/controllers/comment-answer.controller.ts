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
import { CommentAnswerUseCase } from '@/domain/forum/application/use-cases/comment-answer'

const commentAnswerBodySchema = z.object({
  content: z.string(),
})

type CommentAnswerBodySchema = z.infer<typeof commentAnswerBodySchema>

const bodyValidationPipe = new ZodValidationPipe(commentAnswerBodySchema)

@Controller('/answers/:answerId/comments')
export class CommentAnswerController {
  constructor(private commentAnswer: CommentAnswerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CommentAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const { content } = body
    const { sub: userId } = user

    const result = await this.commentAnswer.execute({
      authorId: userId,
      answerId,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
