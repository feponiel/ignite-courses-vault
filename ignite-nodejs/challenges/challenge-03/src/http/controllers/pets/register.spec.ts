import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Register Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { id, token } = await createAndAuthenticateOrg(app)

    const createPetResponse = await request(app.server)
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

    const pet = createPetResponse.body.pet

    expect(createPetResponse.status).toEqual(201)
    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Test Pet',
      }),
    )
  })
})
