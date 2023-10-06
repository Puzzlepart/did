import { IFormControlProps } from 'components/FormControl'
import { ITabProps } from 'components/Tabs'
import { Project } from 'types'

/**
 * @category Projects
 */
export interface IProjectFormProps
  extends ITabProps,
    IFormControlProps<Project> {}
