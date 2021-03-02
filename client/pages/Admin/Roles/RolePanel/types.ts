import { IPanelProps } from 'office-ui-fabric-react'
import { Role } from 'types'

export interface IRolePanelProps extends IPanelProps {
  /**
   * Role to edit
   */
  model?: Role

  /**
   * On save callback
   */
  onSave?: () => void
}
