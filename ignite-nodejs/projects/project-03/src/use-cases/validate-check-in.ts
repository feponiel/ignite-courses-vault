import { AppError } from '@/errors/app-error'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  validatedCheckIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new AppError('Resource not found!', 404)
    }

    if (checkIn.validated_at !== null) {
      throw new AppError(
        'Unable to validate an already validated check-in!',
        409,
      )
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new AppError(
        'Unable to validate the check-in after 20 minutes of its creation!',
        422,
      )
    }

    const validatedCheckIn = await this.checkInsRepository.update(checkInId, {
      validated_at: new Date(),
    })

    return {
      validatedCheckIn,
    }
  }
}
