import { ISearchBoxProps } from 'office-ui-fabric'
import { ISuggestionItem } from './SuggestionItem/types'

export type AutocompleteSelectCallback<T = any> = (item: ISuggestionItem<T>) => void
export type AutocompleteItemIcons = {
  style: React.CSSProperties
}

export interface IAutocompleteProps<T = any> extends ISearchBoxProps {
  label?: string
  description?: string
  itemIcons?: AutocompleteItemIcons
  onSelected: AutocompleteSelectCallback<T>
  items?: ISuggestionItem<T>[]
  noSuggestionsText?: string
  defaultSelectedKey?: string
  errorMessage?: string
  maxHeight?: number
}

export interface IAutocompleteState<T = any> {
  items?: ISuggestionItem<T>[]
  suggestions?: ISuggestionItem<T>[]
  isSuggestionDisabled?: boolean
  value?: string
  selectedItem?: ISuggestionItem
  selectedIndex?: number
}

export * from './SuggestionItem/types'
