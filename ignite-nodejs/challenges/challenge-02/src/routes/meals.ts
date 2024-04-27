import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { database } from '../database'
import { randomUUID } from 'node:crypto'
import { checkIfSessionExists } from '../middlewares/check-if-session-exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkIfSessionExists)

  app.get('/', async (req, res) => {
    const session = req.cookies.session

    const meals = await database('meals').select('*').where({
      linked_user: session,
    })

    return res.send({ meals })
  })

  app.get('/:id', async (req, res) => {
    const session = req.cookies.session

    const requestParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = requestParamsSchema.parse(req.params)

    const meal = await database('meals')
      .select('*')
      .where({
        id,
        linked_user: session,
      })
      .first()

    return res.send({ meal })
  })

  app.post('/', async (req, res) => {
    const mealSchema = z.object({
      name: z.string(),
      description: z.string(),
      diet: z.boolean(),
      date: z.string(),
    })

    const { name, description, diet, date } = mealSchema.parse(req.body)

    const session = req.cookies.session

    await database('meals').insert({
      id: randomUUID(),
      linked_user: session,
      name,
      description,
      diet,
      date,
    })

    return res.status(201).send()
  })

  app.put('/:id', async (req, res) => {
    const session = req.cookies.session

    const requestParamsSchema = z.object({
      id: z.string(),
    })

    const updatedMealSchema = z
      .object({
        name: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        diet: z.boolean().optional(),
      })
      .strict()

    const { id } = requestParamsSchema.parse(req.params)
    const updatedMeal = updatedMealSchema.parse(req.body)
    const isUpdateObjectEmpty = Object.keys(updatedMeal).length === 0

    if (isUpdateObjectEmpty) {
      return res.status(422).send({ error: 'Empty update object!' })
    }

    await database('meals')
      .update({
        ...updatedMeal,
      })
      .where({
        id,
        linked_user: session,
      })

    return res.status(204).send()
  })

  app.delete('/:id', async (req, res) => {
    const session = req.cookies.session

    const requestParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = requestParamsSchema.parse(req.params)

    await database('meals').delete().where({
      id,
      linked_user: session,
    })

    return res.status(204).send()
  })

  app.get('/metrics', async (req, res) => {
    const session = req.cookies.session

    const meals = await database('meals')
      .where({ linked_user: session })
      .orderBy('date', 'desc')

    const mealsInDiet = Number(
      (
        await database('meals')
          .count('diet', {
            as: 'total',
          })
          .where({
            diet: true,
            linked_user: session,
          })
          .first()
      )?.total,
    )

    const nonDietMeals = meals.length - mealsInDiet

    const { bestSequence } = meals.reduce(
      (acc, meal) => {
        if (meal.diet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestSequence) {
          acc.bestSequence = acc.currentSequence
        }

        return acc
      },
      { bestSequence: 0, currentSequence: 0 },
    )

    return res.send({
      totalMeals: meals.length,
      mealsInDiet,
      nonDietMeals,
      bestSequence,
    })
  })
}
