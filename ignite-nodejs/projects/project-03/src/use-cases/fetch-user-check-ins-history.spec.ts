import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-ins History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch user check-ins history', async () => {
    await checkInsRepository.create({
      user_id: '0000001',
      gym_id: '0000010',
    })

    await checkInsRepository.create({
      user_id: '0000001',
      gym_id: '0000835',
    })

    const { checkIns } = await sut.execute({
      userId: '0000001',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
  })

  it('should be able to fetch user check-ins by page', async () => {
    for (let i = 1; i <= 25; i++) {
      await checkInsRepository.create({
        user_id: '0000001',
        gym_id: `00000${i < 10 ? `0${i}` : i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: '0000001',
      page: 2,
    })

    expect(checkIns).toHaveLength(5)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '0000021' }),
      expect.objectContaining({ gym_id: '0000022' }),
      expect.objectContaining({ gym_id: '0000023' }),
      expect.objectContaining({ gym_id: '0000024' }),
      expect.objectContaining({ gym_id: '0000025' }),
    ])
  })
})
