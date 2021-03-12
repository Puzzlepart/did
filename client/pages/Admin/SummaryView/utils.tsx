import DateUtils from 'DateUtils'
import { TFunction } from 'i18next'
import { IColumn, IPivotItemProps } from 'office-ui-fabric-react'
import { ISummaryViewState } from './types'

/**
 * Create rows
 *
 * @param state - State of SummaryView component
 * @param columns - Columns
 * @param t - Translate function
 */
export const createRows = (
  state: ISummaryViewState,
  columns: IColumn[],
  t: TFunction
): any[] => {
  // const rowValues = sortAlphabetically(
  //   unique(
  //     state.timeentries.map((entry_) =>
  //       getValue(entry_, 'resource.displayName', null)
  //     ),
  //     (r) => r
  //   )
  // )
  // const _columns = [...columns].splice(1, columns.length - 2)
  // const rows: ISummaryViewRow[] = rowValues.map((label) => {
  //   const entries = state.timeentries.filter(
  //     (entry_) => getValue(entry_, 'resource.displayName', null) === label
  //   )
  //   return _columns.reduce(
  //     (object, col) => {
  //       const sum = [...entries]
  //         .filter(
  //           (entry_) =>
  //             getValue(entry_, state.scope.fieldName) === col.fieldName
  //         )
  //         .reduce((sum, { duration }) => sum + duration, 0)
  //       object.label = label
  //       object[col.fieldName] = sum
  //       object.sum += sum
  //       return object
  //     },
  //     { sum: 0 } as ISummaryViewRow
  //   )
  // })
  // rows.push(
  //   _columns.reduce(
  //     (object, col) => {
  //       const sum = [...state.timeentries]
  //         .filter(
  //           (event_) =>
  //             getValue(event_, state.scope.fieldName) === col.fieldName
  //         )
  //         .reduce((sum, { duration }) => sum + duration, 0)
  //       object[col.fieldName] = sum
  //       object.sum += sum
  //       return object
  //     },
  //     { label: t('common.sumLabel'), sum: 0 }
  //   )
  // )

  return [{ '40': true }]
}

/**
 * Create periods
 *
 * @param range - Range (default: 0)
 */
export function createPeriods(range: number = 0): IPivotItemProps[] {
  const periods = []
  for (let index = range; index >= 0; index--) {
    const key = (DateUtils.getYear() - index).toString()
    periods.push({ key, itemKey: key, headerText: key })
  }
  return periods
}
