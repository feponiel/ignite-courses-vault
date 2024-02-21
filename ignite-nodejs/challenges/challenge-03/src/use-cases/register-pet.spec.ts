import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'

describe('Register Pet Use Case', () => {
  let petsRepository: PetsRepository
  let orgsRepository: OrgsRepository
  let sut: RegisterPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Test Org',
      email: 'test@example.com',
      password_hash: await hash('123456', 6),
      whatsapp_number: '+55 00-000000000',
      cep: '00000-001',
      address: 'Test Street, 001, Non-existent City,',
      manager: 'Test Manager',
    })

    const { pet } = await sut.execute({
      name: 'Test Pet',
      age: 1,
      breed: 'Golden Retriever',
      size: 'LARGE',
      presentation: `Hello! My name is Test Pet because i don't have a name and i'm a test.`,
      energy_level: 4,
      independence_level: 'LOW',
      adapted_climate: 'TEMPERATE',
      appropriate_environment: 'Large place with a pool',
      care: [],
      city: 'Non-existent City',
      photos: [],
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet with a non-existent organization', async () => {
    await expect(async () => {
      await sut.execute({
        name: 'Test Pet',
        age: 1,
        breed: 'Golden Retriever',
        size: 'LARGE',
        presentation: `Hello! My name is Test Pet because i don't have a name and i'm a test.`,
        energy_level: 4,
        independence_level: 'LOW',
        adapted_climate: 'TEMPERATE',
        appropriate_environment: 'Large place with a pool',
        care: [],
        city: 'Non-existent City',
        photos: [],
        orgId: 'unknown org id',
      })
    }).rejects.toThrowError(expect.objectContaining({ statusCode: 404 }))
  })
})
