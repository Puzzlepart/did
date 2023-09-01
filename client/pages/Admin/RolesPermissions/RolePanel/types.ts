import { IPanelProps } from '@fluentui/react'
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
