import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'

describe('Authenticate Use Case', () => {
  let orgsRepository: OrgsRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Test Org',
      email: 'test@example.com',
      password_hash: await hash('123456', 6),
      whatsapp_number: '+55 00-000000000',
      cep: '00000001',
      address: 'Test Street, 001, Non-existent City,',
      manager: 'Test Manager',
    })

    const { org } = await sut.execute({
      email: 'test@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with an invalid email', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'non-existent@example.com',
        password: '123456',
      })
    }).rejects.toThrowError(expect.objectContaining({ statusCode: 401 }))
  })

  it('should not be able to authenticate if the password does not match', async () => {
    await orgsRepository.create({
      name: 'Test Org',
      email: 'test@example.com',
      password_hash: await hash('123456', 6),
      whatsapp_number: '+55 00-000000000',
      cep: '00000001',
      address: 'Test Street, 001, Non-existent City,',
      manager: 'Test Manager',
    })

    await expect(async () => {
      await sut.execute({
        email: 'test@example.com',
        password: 'wrong-password',
      })
    }).rejects.toThrowError(expect.objectContaining({ statusCode: 401 }))
  })
})
