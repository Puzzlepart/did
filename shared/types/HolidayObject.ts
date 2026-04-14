/**
 * Shared interface for Holiday objects.
 *
 * This is the canonical type used by both client and server.
 * The server's GraphQL `HolidayObject` class implements this interface
 * with additional decorators.
 */
export interface IHolidayObject {
  _id?: string
  date?: Date
  name?: string
  hoursOff?: number
  recurring?: boolean
  notes?: string
  periodId?: string
}
