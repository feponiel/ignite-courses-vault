import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'

describe('Get Pet Use Case', () => {
  let petsRepository: PetsRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet information', async () => {
    const createdPet = await petsRepository.create({
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

    const { pet } = await sut.execute(createdPet.id)

    expect(pet).toEqual(expect.objectContaining({ name: 'Test Pet' }))
  })

  it('should not be able to get a pet information with a non-existent id', async () => {
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
      await sut.execute('Non-existent pet id')
    }).rejects.toThrowError(expect.objectContaining({ statusCode: 404 }))
  })
})
