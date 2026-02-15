import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { MongoDocumentService } from './document'

/**
 * Represents a user-ignored timesheet event.
 */
export interface UserIgnoredEvent {
  /**
   * Composite key: `{userId}:{periodId}:{eventId}`
   */
  _id: string

  /**
   * User who ignored the event
   */
  userId: string

  /**
   * Period ID the event belongs to
   */
  periodId: string

  /**
   * Event ID (MS Graph event ID)
   */
  eventId: string

  /**
   * When the event was ignored
   */
  ignoredAt: Date
}

/**
 * UserIgnoredEvents service for tracking events that users have manually
 * marked as ignored in their timesheet.
 *
 * This replaces the browser storage approach to enable sync across devices.
 *
 * @extends MongoDocumentService
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class UserIgnoredEventsService extends MongoDocumentService<UserIgnoredEvent> {
  /**
   * Constructor for `UserIgnoredEventsService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'user_ignored_events')
  }

  /**
   * Build composite ID for the ignored event record.
   *
   * @param userId - User ID
   * @param periodId - Period ID
   * @param eventId - Event ID
   */
  private _buildCompositeId(
    userId: string,
    periodId: string,
    eventId: string
  ): string {
    return `${userId}:${periodId}:${eventId}`
  }

  /**
   * Check if an event is ignored by the user.
   *
   * @param userId - User ID
   * @param periodId - Period ID
   * @param eventId - Event ID
   */
  public async isEventIgnored(
    userId: string,
    periodId: string,
    eventId: string
  ): Promise<boolean> {
    const id = this._buildCompositeId(userId, periodId, eventId)
    const record = await this.collection.findOne({ _id: id })
    return !!record
  }

  /**
   * Get all ignored event IDs for a user and period.
   *
   * @param userId - User ID
   * @param periodId - Period ID
   */
  public async getIgnoredEventIds(
    userId: string,
    periodId: string
  ): Promise<string[]> {
    const records = await this.find({ userId, periodId })
    return records.map((r) => r.eventId)
  }

  /**
   * Get all ignored events for multiple periods.
   *
   * @param userId - User ID
   * @param periodIds - Array of period IDs
   */
  public async getIgnoredEventsForPeriods(
    userId: string,
    periodIds: string[]
  ): Promise<Map<string, string[]>> {
    const records = await this.find({
      userId,
      periodId: { $in: periodIds }
    })

    const result = new Map<string, string[]>()
    for (const record of records) {
      const existing = result.get(record.periodId) || []
      existing.push(record.eventId)
      result.set(record.periodId, existing)
    }
    return result
  }

  /**
   * Set an event as ignored or un-ignored.
   *
   * @param userId - User ID
   * @param periodId - Period ID
   * @param eventId - Event ID
   * @param ignored - Whether to ignore (true) or un-ignore (false)
   */
  public async setEventIgnored(
    userId: string,
    periodId: string,
    eventId: string,
    ignored: boolean
  ): Promise<void> {
    const id = this._buildCompositeId(userId, periodId, eventId)

    if (ignored) {
      // Upsert the record
      const existing = await this.collection.findOne({ _id: id })
      if (!existing) {
        await this.collection.insertOne({
          _id: id,
          userId,
          periodId,
          eventId,
          ignoredAt: new Date()
        })
      }
    } else {
      // Remove the record
      await this.collection.deleteOne({ _id: id })
    }
  }

  /**
   * Clear all ignored events for a user and period.
   *
   * @param userId - User ID
   * @param periodId - Period ID
   */
  public async clearIgnoredEvents(
    userId: string,
    periodId: string
  ): Promise<number> {
    const result = await this.collection.deleteMany({ userId, periodId })
    return result.deletedCount
  }

  /**
   * Set multiple events as ignored.
   *
   * @param userId - User ID
   * @param periodId - Period ID
   * @param eventIds - Array of event IDs to ignore
   */
  public async setMultipleEventsIgnored(
    userId: string,
    periodId: string,
    eventIds: string[]
  ): Promise<number> {
    let insertedCount = 0
    for (const eventId of eventIds) {
      const id = this._buildCompositeId(userId, periodId, eventId)
      const existing = await this.collection.findOne({ _id: id })
      if (!existing) {
        await this.collection.insertOne({
          _id: id,
          userId,
          periodId,
          eventId,
          ignoredAt: new Date()
        })
        insertedCount++
      }
    }
    return insertedCount
  }
}
