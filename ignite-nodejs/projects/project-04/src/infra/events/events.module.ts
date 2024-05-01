import { Module } from '@nestjs/common'
import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: SendNotificationUseCase,
      useFactory: (notificationsRepository: NotificationsRepository) => {
        return new SendNotificationUseCase(notificationsRepository)
      },
      inject: [NotificationsRepository],
    },

    {
      provide: OnAnswerCreated,
      useFactory: (
        questionsRepository: QuestionsRepository,
        sendNotification: SendNotificationUseCase,
      ) => {
        return new OnAnswerCreated(questionsRepository, sendNotification)
      },
      inject: [QuestionsRepository, SendNotificationUseCase],
    },

    {
      provide: OnQuestionBestAnswerChosen,
      useFactory: (
        answersRepository: AnswersRepository,
        sendNotification: SendNotificationUseCase,
      ) => {
        return new OnQuestionBestAnswerChosen(
          answersRepository,
          sendNotification,
        )
      },
      inject: [AnswersRepository, SendNotificationUseCase],
    },
  ],
})
export class EventsModule {}
