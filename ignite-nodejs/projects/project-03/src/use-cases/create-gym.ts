import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

type CreateGymUseCaseResponse = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
