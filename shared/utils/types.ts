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
   * Use ISO week
   */
  isoWeek: boolean
}

export type DateWithTimezone = {
  dateTime?: string
  timeZone?: string
}
