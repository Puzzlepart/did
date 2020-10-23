export interface ITimeEntriesQueryVariables {
  /**
   * Start date time
   */
  startDateTime?: string

  /**
   * End date time
   */
  endDateTime?: string

  /**
   * Week number
   */
  weekNumber?: number

  /**
   * Month number
   */
  monthNumber?: number

  /**
   * Year
   */
  year?: number

  /**
   * Get forecast
   */
  forecast?: boolean

  /**
   * Sort ascending
   */
  sortAsc?: boolean
}
