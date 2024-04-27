import { PaginationParams } from '@/domain/forum/application/repositories/types/pagination-params'
import { QuestionCommentsRepository } from '../question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { InMemoryStudentsRepository } from './in-memory-students-repository'
import { CommentWithAuthor } from '@/core/value-objects/comment-with-author'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public questionComments: QuestionComment[] = []

  constructor(private studentsRepository: InMemoryStudentsRepository) {}

  async create(data: QuestionComment) {
    this.questionComments.push(data)
  }

  async findById(id: string) {
    const questionComment = this.questionComments.find(
      (questionComment) => questionComment.id.toString() === id,
    )

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.questionComments
      .filter(
        (questionComment) =>
          questionComment.questionId.toString() === questionId,
      )
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ) {
    const questionComments = this.questionComments
      .filter(
        (questionComment) =>
          questionComment.questionId.toString() === questionId,
      )
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

    return questionComments
  }

  async delete(questionComment: QuestionComment) {
    const questionCommentIndex = this.questionComments.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.questionComments.splice(questionCommentIndex, 1)
  }
}
