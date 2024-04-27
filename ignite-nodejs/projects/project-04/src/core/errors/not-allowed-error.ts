import { UseCaseError } from '@/core/errors/types/use-case-error'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not allowed!')
  }
}
