import { OptionProps } from '@fluentui/react-components'
import { IDynamicSearchBoxProps } from 'components/DynamicSearchBox'
import { FluentIconName } from 'utils/getFluentIcon'
import { FormInputControlBase } from '../types'

/**
 * @category Autocomplete
 */
export interface ISuggestionItem<T = any>
  extends Pick<OptionProps, 'value' | 'key' | 'text'> {
  secondaryText?: string
  searchValue: string
  iconName?: string
  type?: string
  tag?: any
  data?: T
}

/**
 * @ignore
 */
export type AutocompleteControlSelectCallback<T = any> = (
  item: ISuggestionItem<T>
) => void

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

  /**
   * Optional np results message.
   */
  noResultsMessage?: string

  /**
   * Optional min characters to trigger search.
   */
  minCharacters?: number
}

/**
 * @category Autocomplete
 */
/**
 * Represents the state of an `AutocompleteControl` component.
 *
 * @template T The type of the suggestion items.
 */
export interface IAutocompleteControlState<T = any> {
  /**
   * An array of suggestion items to be displayed in the dropdown.
   */
  items?: ISuggestionItem<T>[]

  /**
   * An array of suggestion items filtered based on the user's input.
   */
  suggestions?: ISuggestionItem<T>[]

  /**
   * A boolean indicating whether the suggestion dropdown is disabled.
   */
  isSuggestionDisabled?: boolean

  /**
   * The current value of the input field.
   */
  value?: string

  /**
   * The currently selected suggestion item.
   */
  selectedItem?: ISuggestionItem
}
