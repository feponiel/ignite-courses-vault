import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { compare } from 'bcryptjs'

describe('Create Org Use Case', () => {
  let orgsRepository: OrgsRepository
  let sut: CreateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create an org', async () => {
    const { org } = await sut.execute({
      name: 'Test Org',
      email: 'test@example.com',
      password: '123456',
      whatsapp_number: '+55 00-000000000',
      cep: '00000001',
      address: 'Test Street, 001, Non-existent City,',
      manager: 'Test Manager',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be able to hash the org password', async () => {
    const passwordWithoutHash = '123456'

    const { org } = await sut.execute({
      name: 'Test Org',
      email: 'test@example.com',
      password: passwordWithoutHash,
      whatsapp_number: '+55 00-000000000',
      cep: '00000-001',
      address: 'Test Street, 001, Non-existent City,',
      manager: 'Test Manager',
    })

    const isPasswordCorrectlyHashed = await compare(
      passwordWithoutHash,
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create an org with the same email twice', async () => {
    const email = 'test@example.com'

    await sut.execute({
      name: 'Test Org',
      email,
      password: '123456',
      whatsapp_number: '+55 00-000000000',
      cep: '00000-001',
      address: 'Test Street, 001, Non-existent City,',
      manager: 'Test Manager',
    })

    await expect(async () => {
      await sut.execute({
        name: 'Test Org 2',
        email,
        password: '123456',
        whatsapp_number: '+55 00-000000002',
        cep: '00000-002',
        address: 'Test Street, 002, Non-existent City,',
        manager: 'Test Manager 2',
      })
    }).rejects.toThrowError(expect.objectContaining({ statusCode: 409 }))
  })
})
