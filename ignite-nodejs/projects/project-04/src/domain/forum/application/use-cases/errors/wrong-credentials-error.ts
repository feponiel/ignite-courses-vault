import { UseCaseError } from '@/core/errors/types/use-case-error'

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Invalid credentials!')
  }
}
