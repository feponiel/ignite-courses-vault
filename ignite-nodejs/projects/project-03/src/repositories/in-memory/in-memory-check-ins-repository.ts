import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import {
  CheckInUpdateParams,
  CheckInsRepository,
} from '../check-ins-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async findById(id: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async countByUserId(userId: string) {
    const count = this.checkIns.filter(
      (checkIn) => checkIn.user_id === userId,
    ).length

    return count
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const { gym_id, user_id, validated_at } = data

    const checkIn = {
      id: randomUUID(),
      gym_id,
      user_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async update(id: string, data: CheckInUpdateParams) {
    const checkInIndex = this.checkIns.findIndex((checkIn) => checkIn.id === id)

    this.checkIns[checkInIndex] = {
      ...this.checkIns[checkInIndex],
      ...data,
    }

    return this.checkIns[checkInIndex]
  }
}
