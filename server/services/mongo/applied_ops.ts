import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { MongoDocumentService } from './document'

/**
 * Represents a single applied operation for idempotency tracking.
 */
export interface AppliedOp {
  /**
   * Primary key: opId provided by the client
   */
  _id: string

  /**
   * User who performed the operation
   */
  userId: string

  /**
   * Name of the mutation (e.g., 'submitPeriod', 'lockPeriod')
   */
  mutationName: string

  /**
   * When the operation was applied
   */
  appliedAt: Date

  /**
   * Optional: the result of the operation (for debugging)
   */
  result?: Record<string, any>
}

/**
 * AppliedOps service for tracking idempotent operations.
 *
 * This service stores applied operations keyed by opId to prevent
 * duplicate processing when clients retry mutations (e.g., after
 * going back online).
 *
 * Operations are stored per-subscription (customer database) and
 * include the userId to scope dedupe per-user.
 *
 * @extends MongoDocumentService
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class AppliedOpsService extends MongoDocumentService<AppliedOp> {
  /**
   * Constructor for `AppliedOpsService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'applied_ops')
  }

  /**
   * Check if an operation has already been applied.
   *
   * @param opId - The operation ID to check
   * @param userId - The user ID (scope dedupe per-user)
   *
   * @returns The applied operation if it exists, null otherwise
   */
  public async findAppliedOp(
    opId: string,
    userId: string
  ): Promise<AppliedOp | null> {
    if (!opId) return null
    const compositeId = this._buildCompositeId(opId, userId)
    return await this.collection.findOne({ _id: compositeId })
  }

  /**
   * Mark an operation as applied.
   *
   * @param opId - The operation ID
   * @param userId - The user ID
   * @param mutationName - Name of the mutation
   * @param result - Optional result data for debugging
   */
  public async markApplied(
    opId: string,
    userId: string,
    mutationName: string,
    result?: Record<string, any>
  ): Promise<void> {
    if (!opId) return
    const compositeId = this._buildCompositeId(opId, userId)
    await this.collection.insertOne({
      _id: compositeId,
      userId,
      mutationName,
      appliedAt: new Date(),
      result
    })
  }

  /**
   * Build a composite ID from opId and userId for uniqueness.
   *
   * @param opId - Operation ID
   * @param userId - User ID
   */
  private _buildCompositeId(opId: string, userId: string): string {
    return `${userId}:${opId}`
  }

  /**
   * Clean up old applied operations (optional, for maintenance).
   * Removes ops older than the specified number of days.
   *
   * @param olderThanDays - Number of days
   */
  public async cleanupOldOps(olderThanDays: number = 30): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

    const result = await this.collection.deleteMany({
      appliedAt: { $lt: cutoffDate }
    })

    return result.deletedCount
  }
}
