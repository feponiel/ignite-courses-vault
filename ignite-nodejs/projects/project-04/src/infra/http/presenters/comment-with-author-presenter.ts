import { CommentWithAuthor } from '@/core/value-objects/comment-with-author'

export class CommentWithAuthorPresenter {
  static toHTTP(commentWithAutor: CommentWithAuthor) {
    return {
      commentId: commentWithAutor.commentId,
      authorId: commentWithAutor.authorId,
      authorName: commentWithAutor.author,
      content: commentWithAutor.content,
      createdAt: commentWithAutor.createdAt,
      updatedAt: commentWithAutor.updatedAt,
    }
  }
}
