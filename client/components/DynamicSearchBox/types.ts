import { SearchBoxProps } from '@fluentui/react-components'
import { FluentIconName } from 'utils'

/**
 * Props for the DynamicSearchBox component.
 */
export interface IDynamicSearchBoxProps
  extends Omit<SearchBoxProps, 'onChange'> {
  /**
   * Callback function that is called when the search term changes.
   * @param searchTerm - The new search term.
   */
  onChange: (searchTerm: string) => void

  /**
   * The name of the Fluent UI icon to use for the clear search button.
   */
  clearSearchIconName?: FluentIconName

  /**
   * Callback function that is called when the clear search button is clicked (optional).
   */
  onClear?: () => void

  /**
   * Fluent icon name to render in `contentBefore` (optional).
   */
  iconName?: FluentIconName | string
}
