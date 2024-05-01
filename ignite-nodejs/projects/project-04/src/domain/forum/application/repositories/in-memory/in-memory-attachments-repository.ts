import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { AttachmentsRepository } from '../attachments-repository'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public attachments: Attachment[] = []

  async create(attachment: Attachment) {
    this.attachments.push(attachment)
  }
}
