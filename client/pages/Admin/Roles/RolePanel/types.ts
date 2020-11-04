import { Role } from 'types'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

export interface IRolePanelProps extends IPanelProps {
  /**
   * Role to edit
   */
  model?: Role

  /**
   * On save callback
   *
   * @param {Role} role The role that was updated or added
   */
  onSave?: (role: Role) => void
}
