import { SearchBoxProps } from '@fluentui/react-search-preview'
import { FluentIconName } from 'utils'

export interface IDynamicSearchBoxProps
  extends Omit<SearchBoxProps, 'onChange'> {
  onChange: (searchTerm: string) => void
  clearSearchIconName?: FluentIconName
}
