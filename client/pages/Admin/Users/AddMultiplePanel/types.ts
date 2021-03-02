import { IPanelProps } from 'office-ui-fabric-react'

export interface IAddMultiplePanel extends IPanelProps {
  /**
   * On add
   */
  onAdd?: (users: any[]) => void
}
