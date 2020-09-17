import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

/**
 * @category Admin
 */
export interface IBulkImportPanelProps extends IPanelProps {
  /**
   * On import users
   */
  onImport?: (adUsers: any[]) => void
}
