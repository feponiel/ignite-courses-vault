import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Token (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh an expired token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Test Org',
      email: 'test@example.com',
      password: '123456',
      whatsapp_number: '+55 00-000000000',
      cep: '00000001',
      address: 'Test Street, 001, Non-existent City,',
      manager: 'Test Manager',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'test@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    )
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
