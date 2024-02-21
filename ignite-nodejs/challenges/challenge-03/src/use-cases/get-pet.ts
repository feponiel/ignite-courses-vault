import { AppError } from '@/errors/app-error'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new AppError('Resource not found!', 404)
    }

    return {
      pet,
    }
  }
}
