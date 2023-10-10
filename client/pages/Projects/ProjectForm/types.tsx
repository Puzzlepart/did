import { IFormControlProps } from 'components/FormControl'
import { ITabProps } from 'components/Tabs'
import { Project } from 'types'

/**
 * @category Projects
 */
export interface IProjectFormProps
  extends ITabProps,
  IFormControlProps<Project> {
  /**
   * Refetch callback to execute when the form has been submitted
   * successfully. The function is called with no arguments 1000
   * milliseconds after the project has been created or updated.
   */
  refetch?: () => void
}
