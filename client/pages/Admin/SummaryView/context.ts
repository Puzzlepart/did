import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { IPivotItemProps } from 'office-ui-fabric-react/lib/Pivot'
import { SummaryViewAction } from './reducer'
import { ISummaryViewRow, ISummaryViewScope, ISummaryViewState } from './types'

export interface ISummaryViewContext extends ISummaryViewState {
  /**
   * Dispatcher
   */
  dispatch?: React.Dispatch<SummaryViewAction>

  /**
   * View types
   */
  types: IContextualMenuItem[]

  /**
   * Translate function
   */
  t: TFunction

  /**
   * Loading data
   */
  loading?: boolean

  /**
   * Periods
   */
  periods: IPivotItemProps[]

  /**
   * Scopes
   */
  scopes: ISummaryViewScope[]

  /**
   * Columns
   */
  columns: IColumn[]

  /**
   * Rows
   */
  rows: ISummaryViewRow[]
}
