import { IPanelProps } from 'office-ui-fabric'

export interface IAddMultiplePanel extends IPanelProps {
  /**
   * On add
   */
  onAdd?: (users: any[]) => void
}
