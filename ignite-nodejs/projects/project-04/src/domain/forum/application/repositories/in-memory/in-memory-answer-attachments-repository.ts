import { AnswerAttachmentsRepository } from '../answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public answerAttachments: AnswerAttachment[] = []

  async createMany(attachments: AnswerAttachment[]) {
    this.answerAttachments.push(...attachments)
  }

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachments.filter(
      (answerAttachment) => answerAttachment.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteMany(attachments: AnswerAttachment[]) {
    const answerAttachments = this.answerAttachments.filter(
      (answerAttachment) => {
        return !attachments.some((attachment) =>
          attachment.equals(answerAttachment),
        )
      },
    )

    this.answerAttachments = answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachments.filter(
      (answerAttachment) => answerAttachment.answerId.toString() !== answerId,
    )

    this.answerAttachments = answerAttachments
  }
}
