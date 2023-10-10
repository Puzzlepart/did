import { OperationVariables } from '@apollo/client'
import { IFormControlProps } from 'components/FormControl'
import { ITabProps } from 'components/Tabs'
import { Project, ProjectInput, ProjectOptions } from 'types'

/**
 * @category Projects
 */
export interface IProjectFormProps
  extends ITabProps,
    IFormControlProps<Project> {
  /**
   * Refetch callback to execute when the form has been submitted
   * successfully.
   */
  refetch?: () => void
}

/**
 * Variables for creating or updating a customer.
 */
export interface CreateOrUpdateProjectVariables extends OperationVariables {
  /**
   * The project input object.
   */
  project: Partial<ProjectInput>

  /*
  * Flag that decides whether to update or create a project.
  */
  update?: boolean

  /**
   * Options for the project creation.
   */
  options?: ProjectOptions
}
