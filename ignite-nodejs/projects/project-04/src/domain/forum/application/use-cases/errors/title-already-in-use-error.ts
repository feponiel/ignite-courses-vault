import { UseCaseError } from '@/core/errors/types/use-case-error'

export class TitleAlreadyInUseError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Title ${identifier} is already in use!`)
  }
}
