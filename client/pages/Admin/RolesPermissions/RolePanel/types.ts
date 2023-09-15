import { IPanelProps } from '@fluentui/react'
import { Role } from 'types'

export interface IRolePanelProps extends IPanelProps {
  /**
   * Role to edit
   */
  edit?: Role

  /**
   * On save callback
   */
  onSave?: () => void
}
