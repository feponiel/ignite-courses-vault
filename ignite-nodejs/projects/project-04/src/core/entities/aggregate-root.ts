import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '../events/domain-events'
import { Entity } from './entity'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []

  protected addDomainEvent(domainEvent: DomainEvent) {
    this._domainEvents.push(domainEvent)

    DomainEvents.markAggregateForDispatch(this)
  }

  get domainEvents() {
    return this._domainEvents
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
