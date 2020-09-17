import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

/**
 * @category Admin
 */
export interface IImportPanelProps extends IPanelProps {
  users: any[]
  onImport?: (users: any[]) => void;
}
