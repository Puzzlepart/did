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
      | 'maxSuggestions'
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

  /**
   * Tooltip to display when the component is disabled.
   */
  disabledText?: string

  /**
   * Override the default text rendering for the project.
   *
   * @param project Project to render the text for
   */
  onRenderText?: (project: Project) => string
}
