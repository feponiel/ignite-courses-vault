import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Test Org',
      email: 'test@example.com',
      password: '123456',
      whatsapp_number: '+55 00-000000000',
      cep: '00000001',
      address: 'Test Street, 001, Non-existent City,',
      manager: 'Test Manager',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'test@example.com',
      password: '123456',
    })

    expect(response.body).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    )
  })
})
