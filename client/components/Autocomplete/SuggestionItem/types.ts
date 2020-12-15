import { IDropdownOption } from 'office-ui-fabric'
import { AutocompleteItemIcons } from '../types'

export interface ISuggestionItem<T = any> extends IDropdownOption {
  searchValue: string
  secondaryText?: string
  iconName?: string
  type?: string
  tag?: any
  data?: T
  isSelected?: boolean
}

export interface ISuggestionItemProps extends React.HTMLProps<HTMLDivElement> {
  item: ISuggestionItem
  itemIcons: AutocompleteItemIcons
}
