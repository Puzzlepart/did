import { IPanelProps } from 'office-ui-fabric'

export interface IBulkImportPanelProps extends IPanelProps {
  /**
   * On import users
   */
  onImport?: (adUsers: any[]) => void
}
