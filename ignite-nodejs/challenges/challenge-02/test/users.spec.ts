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

describe('Users routes', () => {
  it('should be able to create a new user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
      })
      .expect(201)
  })
})
