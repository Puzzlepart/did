import { DateObject } from './DateObject'

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
  dayFormat?: string
  monthFormat?: string
  yearFormat?: string
  includeMonth?: {
    startDate?: boolean
    endDate?: boolean
  }
  includeTime?: string
}

export { DateObject }
