import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsUseCase } from './fetch-pets'

describe('Fetch Pets Use Case', () => {
  let petsRepository: PetsRepository
  let sut: FetchPetsUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)
  })

  it('should be able to fetch pets', async () => {
    await petsRepository.create({
      name: 'Test Pet',
      age: 1,
      breed: 'Golden Retriever',
      size: 'LARGE',
      presentation: `Hello! My name is Test Pet because i don't have a name and i'm a test.`,
      energy_level: 3,
      independence_level: 'LOW',
      adapted_climate: 'TEMPERATE',
      appropriate_environment: 'Large place with a pool',
      care: [],
      city: 'Non-existent City',
      photos: [],
      orgId: '0000001',
    })

    await petsRepository.create({
      name: 'Test Pet 2',
      age: 1,
      breed: 'Pinscher',
      size: 'SMALL',
      presentation: `Hello! My name is Test Pet 2 because i don't have a name and i'm a test.`,
      energy_level: 4,
      independence_level: 'MEDIUM',
      adapted_climate: 'TEMPERATE',
      appropriate_environment: 'Confortable and open space',
      care: [],
      city: 'Another Non-existent City',
      photos: [],
      orgId: '0000002',
    })

    const { pets } = await sut.execute({ city: 'Non-existent City' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ city: 'Non-existent City' }),
    ])
  })

  it('should not be able to fetch pets without specifying a city', async () => {
    await petsRepository.create({
      name: 'Test Pet',
      age: 1,
      breed: 'Golden Retriever',
      size: 'LARGE',
      presentation: `Hello! My name is Test Pet because i don't have a name and i'm a test.`,
      energy_level: 3,
      independence_level: 'LOW',
      adapted_climate: 'TEMPERATE',
      appropriate_environment: 'Large place with a pool',
      care: [],
      city: 'Non-existent City',
      photos: [],
      orgId: '0000001',
    })

    await expect(async () => {
      await sut.execute({ city: '' })
    }).rejects.toThrowError(expect.objectContaining({ statusCode: 400 }))
  })

  it('should be able to filter pets by their characteristics', async () => {
    await petsRepository.create({
      name: 'Test Pet',
      age: 1,
      breed: 'Golden Retriever',
      size: 'LARGE',
      presentation: `Hello! My name is Test Pet because i don't have a name and i'm a test.`,
      energy_level: 3,
      independence_level: 'LOW',
      adapted_climate: 'TEMPERATE',
      appropriate_environment: 'Large place with a pool',
      care: [],
      city: 'Non-existent City',
      photos: [],
      orgId: '0000001',
    })

    await petsRepository.create({
      name: 'Test Pet 2',
      age: 1,
      breed: 'Pinscher',
      size: 'SMALL',
      presentation: `Hello! My name is Test Pet 2 because i don't have a name and i'm a test.`,
      energy_level: 4,
      independence_level: 'MEDIUM',
      adapted_climate: 'TEMPERATE',
      appropriate_environment: 'Confortable and open space',
      care: [],
      city: 'Another Non-existent City',
      photos: [],
      orgId: '0000002',
    })

    await petsRepository.create({
      name: 'Test Pet 3',
      age: 2,
      breed: 'Doberman Pinscher',
      size: 'LARGE',
      presentation: `Hello! My name is Test Pet 3 because i don't have a name and i'm a test.`,
      energy_level: 4,
      independence_level: 'HIGH',
      adapted_climate: 'TEMPERATE',
      appropriate_environment: 'Large and open space',
      care: [],
      city: 'Non-existent City',
      photos: [],
      orgId: '0000003',
    })

    const { pets } = await sut.execute({
      city: 'Non-existent City',
      independence_level: 'HIGH',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ breed: 'Doberman Pinscher' }),
    ])
  })
})
