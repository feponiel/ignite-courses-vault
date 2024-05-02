import { AppError } from '@/errors/app-error'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { randomUUID } from 'crypto'

interface RegisterPetUseCaseRequest {
  name: string
  age: number
  breed: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level: number
  independence_level: 'LOW' | 'MEDIUM' | 'HIGH'
  adapted_climate: 'COLD' | 'TEMPERATE' | 'HEAT'
  appropriate_environment: string
  care: string[]
  presentation: string
  city: string
  photos: string[]
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    age,
    breed,
    size,
    energy_level,
    independence_level,
    adapted_climate,
    appropriate_environment,
    care,
    presentation,
    photos,
    city,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    if (energy_level < 1 || energy_level > 5) {
      throw new AppError(
        'The energy level must be a number equal to or between 1 and 5!',
        400,
      )
    }

    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new AppError('Resource not found!', 404)
    }

    const pet = await this.petsRepository.create({
      id: randomUUID(),
      name,
      age,
      breed,
      size,
      energy_level,
      independence_level,
      adapted_climate,
      appropriate_environment,
      care,
      presentation,
      photos,
      city,
      orgId,
    })

    return {
      pet,
    }
  }
}
