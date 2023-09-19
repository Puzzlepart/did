import { IDynamicSearchBoxProps } from 'components/DynamicSearchBox'
import { CSSProperties } from 'react'
import { FluentIconName } from 'utils/getFluentIcon'
import { FormInputControlBase } from '../types'
import { ISuggestionItem } from './SuggestionItem/types'

/**
 * @ignore
 */
export type AutocompleteControlSelectCallback<T = any> = (
  item: ISuggestionItem<T>
) => void

/**
 * @ignore
 */
export type AutocompleteControlItemIcons = {
  style: CSSProperties
}

/**
 * @category Autocomplete
 */
export interface IAutocompleteControlProps<T = any>
  extends FormInputControlBase,
    Pick<IDynamicSearchBoxProps, 'placeholder' | 'autoFocus'> {
  /**
   * Provide the key of the selected item. This will be used to clear
   * the selection when the provided key is `null`.
   */
  selectedKey?: string

  /**
   * Icons to be displayed next to each item.
   */
  itemIcons?: AutocompleteControlItemIcons | boolean

  /**
   * Callback to be called when an item is selected.
   */
  onSelected: AutocompleteControlSelectCallback<T>

  /**
   * Items to be displayed in the autocomplete component.
   */
  items?: ISuggestionItem<T>[]

  /**
   * Text to be displayed when there are no suggestions.
   */
  noSuggestionsText?: string

  /**
   * Default selected key.
   */
  defaultSelectedKey?: string

  /**
   * Max height of the autocomplete component.
   */
  maxHeight?: number

  /**
   * Function to get an icon based on the selected item.
   */
  getIcon?: (item: ISuggestionItem<T>) => FluentIconName
}

/**
 * @category Autocomplete
 */
export interface IAutocompleteControlState<T = any> {
  items?: ISuggestionItem<T>[]
  suggestions?: ISuggestionItem<T>[]
  isSuggestionDisabled?: boolean
  value?: string
  selectedItem?: ISuggestionItem
  selectedIndex?: number
}

export * from './SuggestionItem/types'
