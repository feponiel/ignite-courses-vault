import { UseCaseError } from '@/core/errors/types/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found!')
  }
}
