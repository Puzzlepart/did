import { IPanelProps } from '@fluentui/react'

export interface IAddMultiplePanelProps extends IPanelProps {
  /**
   * On add
   */
  onAdd?: (users: any[]) => void
}
