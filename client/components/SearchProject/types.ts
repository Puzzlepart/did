import { ISearchBoxProps } from '@fluentui/react'
import { IAutocompleteControlProps } from 'components/FormControl'
import { Project } from 'types'

export interface ISearchProjectProps
  extends ISearchBoxProps,
    Pick<
      IAutocompleteControlProps,
      | 'initialFilter'
      | 'intialFilterPlaceholder'
      | 'label'
      | 'placeholder'
      | 'description'
      | 'selectedKey'
    > {
  /**
   * Callback when a project is selected.
   *
   * @param project The selected project
   */
  onSelected: (project: Project) => void

  /**
   * Optional filter function to apply to limit
   * the projects that are displayed.
   *
   * @param project Project to filter
   */
  filterFunc?: (project?: Project) => boolean
}
