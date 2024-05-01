import { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): Student {
    const student = Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    )

    return student
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}
