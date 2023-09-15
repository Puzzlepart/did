import { IFormControlProps } from 'components/FormControl'
import { ITabProps } from 'components/Tabs'

/**
 * @category Projects
 */
export interface IProjectFormProps extends ITabProps, IFormControlProps {
  /**
   * Specify the customer key to use for the project creation. The
   * customer field will be disabled and the customer key will be
   * used to create the project.
   */
  customerKey?: string
}
