import { ISearchBoxProps } from 'office-ui-fabric'

export interface IAutocompleteClassNames {
  suggestionsCallout?: string
  suggestionContainer?: string
  suggestion?: string
  suggestionValue?: string
  suggestionIcon?: string
}

export interface IAutocompleteProps<T = any> extends ISearchBoxProps {
  onSelected: (item: ISuggestionItem<T>) => void
  items?: ISuggestionItem<T>[]
  searchCallback?: (item: string) => void
  noSuggestionsText?: string
  defaultSelectedItem?: ISuggestionItem<T>
  classNames?: IAutocompleteClassNames
  showIcons?: boolean
  label?: string
  description?: string
  errorMessage?: string
}

export interface IAutocompleteState {
  isSuggestionDisabled: boolean
  searchText: string
  selectedItem?: ISuggestionItem
}

export interface ISuggestionItem<T = any> {
  key: string | number
  displayValue: string
  searchValue: string
  iconName?: string
  type?: string
  tag?: any
  data?: T
}
