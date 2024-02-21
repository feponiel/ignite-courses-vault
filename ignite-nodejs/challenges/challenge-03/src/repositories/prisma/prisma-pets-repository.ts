import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { FindManyPetsFilter, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        ...data,
      },
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async findMany(filter: FindManyPetsFilter) {
    const pets = await prisma.pet.findMany({
      where: filter,
    })

    return pets
  }
}
