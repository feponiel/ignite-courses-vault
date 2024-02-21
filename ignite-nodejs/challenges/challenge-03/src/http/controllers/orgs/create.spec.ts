import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an org', async () => {
    const createOrgResponse = await request(app.server).post('/orgs').send({
      name: 'Test Org',
      email: 'test@example.com',
      password: '123456',
      whatsapp_number: '+55 00-000000000',
      cep: '00000001',
      address: 'Test Street, 001, Non-existent City,',
      manager: 'Test Manager',
    })

    const org = createOrgResponse.body.org

    expect(org).toEqual(expect.objectContaining({ id: expect.any(String) }))
  })
})
