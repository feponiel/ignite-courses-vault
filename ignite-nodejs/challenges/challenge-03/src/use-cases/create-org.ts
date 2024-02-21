import { AppError } from '@/errors/app-error'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  address: string
  whatsapp_number: string
  manager: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    address,
    whatsapp_number,
    manager,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new AppError('Org already exists!', 409)
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      cep,
      address,
      whatsapp_number,
      manager,
    })

    return {
      org,
    }
  }
}
