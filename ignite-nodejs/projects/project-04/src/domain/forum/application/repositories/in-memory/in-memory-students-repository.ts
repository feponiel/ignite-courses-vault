import { DomainEvents } from '@/core/events/domain-events'
import { StudentsRepository } from '../students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: Student[] = []

  async create(data: Student) {
    this.students.push(data)

    DomainEvents.dispatchEventsForAggregate(data.id)
  }

  async findByEmail(email: string) {
    const student = this.students.find((student) => student.email === email)

    if (!student) {
      return null
    }

    return student
  }
}
