import { Pet, Prisma } from '@prisma/client'
import { FindManyPetsFilter, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      ...data,
    } as Pet

    this.pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findMany(filter: FindManyPetsFilter) {
    const pets = this.pets.filter((pet) => {
      return Object.entries(filter).every(([key, value]) => {
        return pet[key as keyof typeof pet] === value
      })
    })

    return pets
  }
}
