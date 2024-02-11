import { Gym, Prisma } from '@prisma/client'
import { GymFindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async findMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby(userLocation: GymFindManyNearbyParams) {
    const nearbyGyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE (
      6371 * acos( cos( radians(${userLocation.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLocation.longitude}) ) + sin( radians(${userLocation.latitude}) ) * sin( radians( latitude ) ) ) 
    ) <= 10
    `

    return nearbyGyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
