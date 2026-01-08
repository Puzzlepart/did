export interface Holiday {
  date: string // ISO format YYYY-MM-DD
  name: string
  hoursOff: number // 0-8, where 8 = full day, 4 = half day, 0 = working day
  recurring?: boolean
  notes?: string
}

export interface HolidaysConfiguration {
  enabled?: boolean
  countryCode?: string
  holidays?: Holiday[]
}

export interface IHolidaysFieldProps {
  /**
   * Field ID
   */
  id: string

  /**
   * Current value - holiday configuration
   */
  value?: HolidaysConfiguration

  /**
   * On change callback
   */
  onChange?: (value: HolidaysConfiguration) => void
}
