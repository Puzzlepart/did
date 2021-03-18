import { DateObject } from './date'

export interface IDateUtils {
  /**
   * Timezone offset
   *
   * Retrieved from Date.getTimezoneOffset()
   */
  tzOffset: number

  /**
   * Default month format
   */
  monthFormat: string

  /**
   * Default year format
   */
  yearFormat: string

  /**
   * Use ISO week
   */
  isoWeek: boolean
}

export type DateWithTimezone = {
  dateTime?: string
  timeZone?: string
}

export type TimeSpanStringOptions = {
  startDate?: DateObject
  endDate?: DateObject
  week?: number
  year?: number
  monthFormat?: string
  yearFormat?: string
}
