import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

/**
 * @category Admin
 */
export interface IImportPanelProps extends IPanelProps {
  /**
   * Active Directory users
   */
  adUsers: any[]

  /**
   * On import users
   */
  onImport?: (adUsers: any[]) => void
}
