import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      ...data,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }

  async findById(id: string) {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
