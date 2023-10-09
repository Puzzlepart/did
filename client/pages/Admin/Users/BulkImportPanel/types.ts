import { IPanelProps } from 'components/Panel'

export interface IBulkImportPanelProps extends IPanelProps {
  /**
   * On add
   */
  onAdd?: (users: any[]) => void
}
