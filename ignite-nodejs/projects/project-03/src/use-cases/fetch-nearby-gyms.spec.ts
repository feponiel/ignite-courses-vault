import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch just nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Nearby Gym',
      latitude: -22.7884662,
      longitude: -47.3021757,
    })

    await gymsRepository.create({
      name: 'Far Gym',
      latitude: 42.3218064,
      longitude: -71.0795723,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.7884662,
      userLongitude: -47.3021757,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Nearby Gym' })])
  })
})
