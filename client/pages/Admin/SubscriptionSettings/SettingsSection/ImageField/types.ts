export interface IImageFieldProps {
  /**
   * The label of the field
   */
  label?: string

  /**
   * The description of the field
   */
  description?: string

  /**
   * The current value of the field
   */
  value?: string

  /**
   * On change handler for the field
   *
   * @param value The value of the field
   */
  onChange?: (value: string) => void
}
