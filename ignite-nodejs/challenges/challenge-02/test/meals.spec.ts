import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
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

describe('Meals routes', () => {
  it('should be able to register a new meal', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
      })
      .expect(201)

    const session = user.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal',
        description: '2 pounds of code with 1 liter of coffee',
        diet: true,
        date: new Date(),
      })
      .expect(201)
  })

  it(`should be able to list all of a user's meals`, async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
      })
      .expect(201)

    const session = user.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal',
        description: '2 pounds of code with 1 liter of coffee',
        diet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal 2',
        description: 'Python meat',
        diet: false,
        date: new Date(),
      })
      .expect(201)

    const userMealList = await request(app.server)
      .get('/meals')
      .set('Cookie', session)
      .expect(200)

    expect(userMealList.body.meals).toHaveLength(2)
  })

  it(`should be able to list a single user meal`, async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
      })
      .expect(201)

    const session = user.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal',
        description: '2 pounds of code with 1 liter of coffee',
        diet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal 2',
        description: 'Python meat',
        diet: false,
        date: new Date(),
      })
      .expect(201)

    const userMealList = await request(app.server)
      .get('/meals')
      .set('Cookie', session)
      .expect(200)

    const firstMealId = userMealList.body.meals[0].id

    const userSingleMeal = await request(app.server)
      .get(`/meals/${firstMealId}`)
      .set('Cookie', session)
      .expect(200)

    expect(userSingleMeal.body.meals).toEqual(
      expect.objectContaining({
        name: 'Test meal',
        description: '2 pounds of code with 1 liter of coffee',
        diet: 1,
        date: expect.any(String),
      }),
    )
  })

  it(`should be able to update a user meal`, async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
      })
      .expect(201)

    const session = user.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal',
        description: '2 pounds of code with 1 liter of coffee',
        diet: true,
        date: new Date(),
      })
      .expect(201)

    let userMealList = await request(app.server)
      .get('/meals')
      .set('Cookie', session)
      .expect(200)

    const mealToUpdateId = userMealList.body.meals[0].id

    await request(app.server)
      .put(`/meals/${mealToUpdateId}`)
      .set('Cookie', session)
      .send({
        description: '1 pound of code with 4 liter of coffee',
        diet: false,
      })
      .expect(204)

    userMealList = await request(app.server)
      .get('/meals')
      .set('Cookie', session)
      .expect(200)

    expect(userMealList.body.meals[0]).toEqual(
      expect.objectContaining({
        name: 'Test meal',
        description: '1 pound of code with 4 liter of coffee',
        diet: 0,
        date: expect.any(String),
      }),
    )
  })

  it(`should be able to delete a user meal`, async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
      })
      .expect(201)

    const session = user.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal',
        description: '2 pounds of code with 1 liter of coffee',
        diet: true,
        date: new Date(),
      })
      .expect(201)

    let userMealList = await request(app.server)
      .get('/meals')
      .set('Cookie', session)
      .expect(200)

    const mealToDeleteId = userMealList.body.meals[0].id

    await request(app.server)
      .delete(`/meals/${mealToDeleteId}`)
      .set('Cookie', session)
      .expect(204)

    userMealList = await request(app.server)
      .get('/meals')
      .set('Cookie', session)
      .expect(200)

    expect(userMealList.body.meals).toHaveLength(0)
  })

  it('should be able to get the user metrics', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
      })
      .expect(201)

    const session = user.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal',
        description: '2 pounds of code with 1 liter of coffee',
        diet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal 2',
        description: 'Python meat',
        diet: false,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal 3',
        description: 'Eggs and Orange Juice',
        diet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', session)
      .send({
        name: 'Test meal 4',
        description: 'Coffee again',
        diet: true,
        date: new Date(),
      })
      .expect(201)

    const userMetrics = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', session)
      .expect(200)

    expect(userMetrics.body).toEqual(
      expect.objectContaining({
        totalMeals: 4,
        mealsInDiet: 3,
        nonDietMeals: 1,
        bestSequence: 2,
      }),
    )
  })
})
