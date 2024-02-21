import { ISearchBoxProps } from '@fluentui/react'
import { IAutocompleteControlProps } from 'components/FormControl'
import { Project } from 'types'

export interface ISearchProjectProps extends ISearchBoxProps, Pick<IAutocompleteControlProps, 'initialFilter' | 'intialFilterPlaceholder'> {
  /**
   * Callback when a project is selected.
   *
   * @param project The selected project
   */
  onSelected: (project: Project) => void
}
