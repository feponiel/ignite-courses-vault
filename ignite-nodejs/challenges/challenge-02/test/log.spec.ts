import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

beforeAll(async () => {
  await app.ready()
})

beforeEach(() => {
  execSync('npm run knex -- migrate:rollback --all')
  execSync('npm run knex -- migrate:latest')
})

afterAll(async () => {
  await app.close()
})

describe('Log routes', () => {
  it('should be able to log in', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
      })
      .expect(201)

    const session = response.get('Set-Cookie')

    await request(app.server)
      .post('/log/out')
      .set('Cookie', session)
      .expect(200)

    await request(app.server)
      .post('/log/in')
      .send({
        email: 'test@example.com',
      })
      .expect(200)
  })

  it('should be able to log out', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
      })
      .expect(201)

    const session = response.get('Set-Cookie')

    await request(app.server)
      .post('/log/out')
      .set('Cookie', session)
      .expect(200)
  })
})
