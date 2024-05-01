import { PaginationParams } from '@/domain/forum/application/repositories/types/pagination-params'
import { AnswerCommentsRepository } from '../answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'
import { InMemoryStudentsRepository } from './in-memory-students-repository'
import { CommentWithAuthor } from '@/core/value-objects/comment-with-author'

@Injectable()
export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = []

  constructor(private studentsRepository: InMemoryStudentsRepository) {}

  async create(data: AnswerComment) {
    this.answerComments.push(data)
  }

  async findById(id: string) {
    const answerComment = this.answerComments.find(
      (answerComment) => answerComment.id.toString() === id,
    )

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.answerComments
      .filter((answerComment) => answerComment.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ) {
    const answerComments = this.answerComments
      .filter((answerComment) => answerComment.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.students.find((student) =>
          student.id.equals(comment.authorId),
        )

        if (!author) {
          throw new Error(
            `Author with id "${comment.authorId.toString()}" does not exist!`,
          )
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          authorId: comment.authorId,
          author: author.name,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        })
      })

    return answerComments
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = this.answerComments.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.answerComments.splice(answerCommentIndex, 1)
  }
}
