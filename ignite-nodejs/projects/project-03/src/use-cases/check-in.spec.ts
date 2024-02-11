import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

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

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: '0000001',
      userId: '0000001',
      userLatitude: -22.7884662,
      userLongitude: -47.3021757,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 30, 8, 0, 0))

    await sut.execute({
      gymId: '0000001',
      userId: '0000001',
      userLatitude: -22.7884662,
      userLongitude: -47.3021757,
    })

    await expect(async () => {
      await sut.execute({
        gymId: '0000001',
        userId: '0000001',
        userLatitude: -22.7884662,
        userLongitude: -47.3021757,
      })
    }).rejects.toThrowError(
      expect.objectContaining({
        statusCode: 409,
      }),
    )
  })

  it('should be able to check in on different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 30, 8, 0, 0))

    await sut.execute({
      gymId: '0000001',
      userId: '0000001',
      userLatitude: -22.7884662,
      userLongitude: -47.3021757,
    })

    vi.setSystemTime(new Date(2024, 0, 31, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: '0000001',
      userId: '0000001',
      userLatitude: -22.7884662,
      userLongitude: -47.3021757,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in away from a gym', async () => {
    await expect(async () => {
      await sut.execute({
        gymId: '0000001',
        userId: '0000001',
        userLatitude: -22.8394683,
        userLongitude: -47.2888391,
      })
    }).rejects.toThrowError(
      expect.objectContaining({
        statusCode: 403,
      }),
    )
  })
})
