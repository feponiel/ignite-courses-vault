import { Pet, Prisma } from '@prisma/client'

export interface FindManyPetsFilter {
  city: string
  age?: number
  breed?: string
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level?: number
  independence_level?: 'LOW' | 'MEDIUM' | 'HIGH'
  adapted_climate?: 'COLD' | 'TEMPERATE' | 'HEAT'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findMany(filter: FindManyPetsFilter): Promise<Pet[]>
}
