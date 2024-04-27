import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { FindQuestionBySlugController } from './controllers/find-question-by-slug.controller'
import { FindQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/find-question-by-slug'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { EditQuestionController } from './controllers/edit-question.controller'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { FetchAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-answers'
import { FetchAnswersController } from './controllers/fetch-answers.controller'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { CommentQuestionUseCase } from '@/domain/forum/application/use-cases/comment-question'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { CommentQuestionController } from './controllers/comment-question.controller'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { CommentAnswerUseCase } from '@/domain/forum/application/use-cases/comment-answer'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { CommentAnswerController } from './controllers/comment-answer.controller'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'
import { StorageModule } from '../storage/storage.module'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import { Uploader } from '@/domain/forum/application/storage/uploader'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { ReadNotificationController } from './controllers/read-notification.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],

  providers: [
    {
      provide: CreateQuestionUseCase,
      useFactory: (questionsRepository: QuestionsRepository) => {
        return new CreateQuestionUseCase(questionsRepository)
      },
      inject: [QuestionsRepository],
    },

    {
      provide: FetchRecentQuestionsUseCase,
      useFactory: (questionsRepository: QuestionsRepository) => {
        return new FetchRecentQuestionsUseCase(questionsRepository)
      },
      inject: [QuestionsRepository],
    },

    {
      provide: RegisterStudentUseCase,
      useFactory: (
        studentsRepository: StudentsRepository,
        hashGenerator: HashGenerator,
      ) => {
        return new RegisterStudentUseCase(studentsRepository, hashGenerator)
      },
      inject: [StudentsRepository, HashGenerator],
    },

    {
      provide: AuthenticateStudentUseCase,
      useFactory: (
        studentsRepository: StudentsRepository,
        hashComparer: HashComparer,
        encrypter: Encrypter,
      ) => {
        return new AuthenticateStudentUseCase(
          studentsRepository,
          hashComparer,
          encrypter,
        )
      },
      inject: [StudentsRepository, HashComparer, Encrypter],
    },

    {
      provide: FindQuestionBySlugUseCase,
      useFactory: (questionsRepository: QuestionsRepository) => {
        return new FindQuestionBySlugUseCase(questionsRepository)
      },
      inject: [QuestionsRepository],
    },

    {
      provide: EditQuestionUseCase,
      useFactory: (
        questionsRepository: QuestionsRepository,
        questionAttachmentsRepository: QuestionAttachmentsRepository,
      ) => {
        return new EditQuestionUseCase(
          questionsRepository,
          questionAttachmentsRepository,
        )
      },
      inject: [QuestionsRepository, QuestionAttachmentsRepository],
    },

    {
      provide: DeleteQuestionUseCase,
      useFactory: (questionsRepository: QuestionsRepository) => {
        return new DeleteQuestionUseCase(questionsRepository)
      },
      inject: [QuestionsRepository],
    },

    {
      provide: AnswerQuestionUseCase,
      useFactory: (answersRepository: AnswersRepository) => {
        return new AnswerQuestionUseCase(answersRepository)
      },
      inject: [AnswersRepository],
    },

    {
      provide: EditAnswerUseCase,
      useFactory: (
        answersRepository: AnswersRepository,
        answerAttachmentsRepository: AnswerAttachmentsRepository,
      ) => {
        return new EditAnswerUseCase(
          answersRepository,
          answerAttachmentsRepository,
        )
      },
      inject: [AnswersRepository, AnswerAttachmentsRepository],
    },

    {
      provide: DeleteAnswerUseCase,
      useFactory: (answersRepository: AnswersRepository) => {
        return new DeleteAnswerUseCase(answersRepository)
      },
      inject: [AnswersRepository],
    },

    {
      provide: FetchAnswersUseCase,
      useFactory: (answersRepository: AnswersRepository) => {
        return new FetchAnswersUseCase(answersRepository)
      },
      inject: [AnswersRepository],
    },

    {
      provide: ChooseQuestionBestAnswerUseCase,
      useFactory: (
        questionsRepository: QuestionsRepository,
        answersRepository: AnswersRepository,
      ) => {
        return new ChooseQuestionBestAnswerUseCase(
          questionsRepository,
          answersRepository,
        )
      },
      inject: [QuestionsRepository, AnswersRepository],
    },

    {
      provide: CommentQuestionUseCase,
      useFactory: (
        questionsRepository: QuestionsRepository,
        questionCommentsRepository: QuestionCommentsRepository,
      ) => {
        return new CommentQuestionUseCase(
          questionsRepository,
          questionCommentsRepository,
        )
      },
      inject: [QuestionsRepository, QuestionCommentsRepository],
    },

    {
      provide: DeleteQuestionCommentUseCase,
      useFactory: (questionCommentsRepository: QuestionCommentsRepository) => {
        return new DeleteQuestionCommentUseCase(questionCommentsRepository)
      },
      inject: [QuestionCommentsRepository],
    },

    {
      provide: CommentAnswerUseCase,
      useFactory: (
        answersRepository: AnswersRepository,
        answerCommentsRepository: AnswerCommentsRepository,
      ) => {
        return new CommentAnswerUseCase(
          answersRepository,
          answerCommentsRepository,
        )
      },
      inject: [AnswersRepository, AnswerCommentsRepository],
    },

    {
      provide: DeleteAnswerCommentUseCase,
      useFactory: (answerCommentsRepository: AnswerCommentsRepository) => {
        return new DeleteAnswerCommentUseCase(answerCommentsRepository)
      },
      inject: [AnswerCommentsRepository],
    },

    {
      provide: FetchQuestionCommentsUseCase,
      useFactory: (questionCommentsRepository: QuestionCommentsRepository) => {
        return new FetchQuestionCommentsUseCase(questionCommentsRepository)
      },
      inject: [QuestionCommentsRepository],
    },

    {
      provide: FetchAnswerCommentsUseCase,
      useFactory: (answerCommentsRepository: AnswerCommentsRepository) => {
        return new FetchAnswerCommentsUseCase(answerCommentsRepository)
      },
      inject: [AnswerCommentsRepository],
    },

    {
      provide: UploadAndCreateAttachmentUseCase,
      useFactory: (
        attachmentsRepository: AttachmentsRepository,
        uploader: Uploader,
      ) => {
        return new UploadAndCreateAttachmentUseCase(
          attachmentsRepository,
          uploader,
        )
      },
      inject: [AttachmentsRepository, Uploader],
    },

    {
      provide: ReadNotificationUseCase,
      useFactory: (notificationsRepository: NotificationsRepository) => {
        return new ReadNotificationUseCase(notificationsRepository)
      },
      inject: [NotificationsRepository],
    },
  ],

  controllers: [
    AuthenticateController,
    CreateAccountController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    FindQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchAnswersController,
    ChooseQuestionBestAnswerController,
    CommentQuestionController,
    DeleteQuestionCommentController,
    CommentAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentController,
    ReadNotificationController,
  ],
})
export class HttpModule {}
