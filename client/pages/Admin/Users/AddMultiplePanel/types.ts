import { IPanelProps } from '@fluentui/react'

export interface IAddMultiplePanel extends IPanelProps {
  /**
   * On add
   */
  onAdd?: (users: any[]) => void
}
