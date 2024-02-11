import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInUpdateParams {
  validated_at?: Date
}

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  update(id: string, data: CheckInUpdateParams): Promise<CheckIn>
}
