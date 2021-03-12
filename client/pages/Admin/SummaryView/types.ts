import { IPivotItemProps } from 'office-ui-fabric-react'
import { ILabelColumnProps } from 'pages/Admin/SummaryView/LabelColumn/types'

export interface ISummaryViewScope extends IPivotItemProps {
  /**
   * Field name
   */
  fieldName: string

  /**
   * Get column header for the specified index
   */
  getColumnHeader: (index: number) => string
}

export interface ISummaryViewState {
  /**
   * Selected scope
   */
  scope: ISummaryViewScope

  users: any[]
  periods: any[]
}

export interface ISummaryViewRow extends ILabelColumnProps {
  /**
   * Sum hours
   */
  sum: number
}
