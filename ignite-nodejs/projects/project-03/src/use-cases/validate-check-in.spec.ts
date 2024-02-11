import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    await gymsRepository.create({
      id: '0000001',
      name: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -22.7884662,
      longitude: -47.3021757,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate a check-in', async () => {
    const checkIn = await checkInsRepository.create({
      gym_id: '0000001',
      user_id: '0000001',
    })

    const { validatedCheckIn } = await sut.execute({
      checkInId: checkIn.id,
    })

    expect(validatedCheckIn.validated_at !== null).toEqual(true)
  })

  it('should not be able to validate a non-existent check-in', async () => {
    await expect(async () => {
      await sut.execute({
        checkInId: 'non-existent-check-in-id',
      })
    }).rejects.toThrowError(
      expect.objectContaining({
        statusCode: 404,
      }),
    )
  })

  it('should not be able to validate a check-in 20 minutes after its creation', async () => {
    vi.setSystemTime(new Date(2024, 0, 30, 8, 0, 0))

    const checkIn = await checkInsRepository.create({
      gym_id: '0000001',
      user_id: '0000001',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(async () => {
      await sut.execute({
        checkInId: checkIn.id,
      })
    }).rejects.toThrowError(
      expect.objectContaining({
        statusCode: 422,
      }),
    )
  })

  it('should not be able to validate an already validated check-in', async () => {
    const checkIn = await checkInsRepository.create({
      gym_id: '0000001',
      user_id: '0000001',
    })

    await sut.execute({
      checkInId: checkIn.id,
    })

    await expect(async () => {
      await sut.execute({
        checkInId: checkIn.id,
      })
    }).rejects.toThrowError(
      expect.objectContaining({
        statusCode: 409,
      }),
    )
  })
})
