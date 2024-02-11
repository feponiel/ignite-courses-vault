import { Gym, Prisma } from '@prisma/client'
import { GymFindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async findMany(query: string, page: number) {
    const gyms = this.gyms
      .filter((gym) => gym.name.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyNearby(userLocation: GymFindManyNearbyParams) {
    const nearbyGyms = this.gyms.filter((gym) => {
      const gymDistance = getDistanceBetweenCoordinates(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return gymDistance <= 10
    })

    return nearbyGyms
  }

  async create(data: Prisma.GymCreateInput) {
    const { id, name, description, phone, latitude, longitude } = data

    const gym = {
      id: id ?? randomUUID(),
      name,
      description: description ?? null,
      phone: phone ?? null,
      latitude: new Decimal(latitude.toString()),
      longitude: new Decimal(longitude.toString()),
    }

    this.gyms.push(gym)

    return gym
  }
}
