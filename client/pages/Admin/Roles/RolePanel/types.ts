import { IRole } from 'types/IRole'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

export interface IRolePanelProps extends IPanelProps {
  /**
   * Role to edit
   */
  model?: IRole

  /**
   * On save callback
   *
   * @param {IRole} role The role that was updated or added
   */
  onSave?: (role: IRole) => void
}
