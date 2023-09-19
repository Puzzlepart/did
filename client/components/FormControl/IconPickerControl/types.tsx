import { IAutocompleteControlProps } from '../AutocompleteControl'

export interface IIconPickerControlProps
  extends Omit<IAutocompleteControlProps<any>, 'onSelected'> {
  /**
   * Default selected icon
   */
  defaultSelected?: string

  /**
   * On selected callback for the icon picker.
   * If not specified `model` and `name` should
   * be specified instead.
   */
  onSelected?: (icon: string) => void

  /**
   * Include icons from Fluent UI 2 in the suggestions.
   */
  includeFluentIcons?: boolean
}
