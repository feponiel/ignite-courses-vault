import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Fetch Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets', async () => {
    const { id, token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .auth(token, {
        type: 'bearer',
      })
      .send({
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
        orgId: id,
      })

    await request(app.server)
      .post('/pets')
      .auth(token, {
        type: 'bearer',
      })
      .send({
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
        orgId: id,
      })

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Another Non-existent City',
      })
      .send()

    const { pets } = response.body

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Test Pet 2',
        breed: 'Pinscher',
      }),
    ])
  })
})
