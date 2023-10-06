import { IPanelProps } from '@fluentui/react'

export interface IBulkImportPanelProps extends IPanelProps {
  /**
   * On add
   */
  onAdd?: (users: any[]) => void
}
