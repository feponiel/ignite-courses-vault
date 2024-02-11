import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get user check-ins count from metrics', async () => {
    await checkInsRepository.create({
      user_id: '0000001',
      gym_id: '0000010',
    })

    await checkInsRepository.create({
      user_id: '0000001',
      gym_id: '0000835',
    })

    const { checkInsCount } = await sut.execute({
      userId: '0000001',
    })

    expect(checkInsCount).toEqual(2)
  })
})
