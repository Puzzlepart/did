export interface IHolidaysFieldProps {
  /**
   * Field ID
   */
  id: string

  /**
   * Current value
   */
  value?: any

  /**
   * On change callback
   */
  onChange?: (value: any) => void
}
