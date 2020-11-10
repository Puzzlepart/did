import { TFunction } from 'i18next'
import { IColumn, IContextualMenuItem, IPivotItemProps } from 'office-ui-fabric'
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
