import { AppError } from '@/errors/app-error'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsUseCaseRequest {
  city: string
  age?: number
  breed?: string
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level?: number
  independence_level?: 'LOW' | 'MEDIUM' | 'HIGH'
  adapted_climate?: 'COLD' | 'TEMPERATE' | 'HEAT'
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    filter: FetchPetsUseCaseRequest,
  ): Promise<FetchPetsUseCaseResponse> {
    if (!filter.city) {
      throw new AppError('You must provide a city to fetch pets', 400)
    }

    const pets = await this.petsRepository.findMany(filter)

    return {
      pets,
    }
  }
}
