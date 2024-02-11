import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      id: '0000001',
      name: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -22.7884662,
      longitude: -47.3021757,
    })

    await gymsRepository.create({
      id: '0000002',
      name: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: 42.3218064,
      longitude: -71.0795723,
    })

    const { gyms } = await sut.execute({
      query: 'Script',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
  })

  it('should be able to search for gyms by page', async () => {
    for (let i = 1; i <= 25; i++) {
      await gymsRepository.create({
        name: `JavaScript Gym Branch ${i}`,
        latitude: 42.3218064,
        longitude: -71.0795723,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(5)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'JavaScript Gym Branch 21' }),
      expect.objectContaining({ name: 'JavaScript Gym Branch 22' }),
      expect.objectContaining({ name: 'JavaScript Gym Branch 23' }),
      expect.objectContaining({ name: 'JavaScript Gym Branch 24' }),
      expect.objectContaining({ name: 'JavaScript Gym Branch 25' }),
    ])
  })
})
