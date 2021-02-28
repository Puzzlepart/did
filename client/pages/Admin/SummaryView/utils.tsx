import { DurationColumn } from 'components/DurationColumn'
import DateUtils from 'DateUtils'
import { getValue, sortAlphabetically } from 'helpers'
import { TFunction } from 'i18next'
import { IColumn, IPivotItemProps } from 'office-ui-fabric-react'
import React from 'react'
import { first, unique } from 'underscore'
import { generateColumn as col } from 'utils/generateColumn'
import { LabelColumn } from './LabelColumn'
import { ISummaryViewRow, ISummaryViewState } from './types'
/**
 * Create columns
 *
 * @param state - State of SummaryView component
 * @param t - Translate function
 */
export function createColumns(
  state: ISummaryViewState,
  t: TFunction
): IColumn[] {
  let uniqueColumnValues: any[] = unique(
    state.timeentries.map((e) => ({
      year: e.year,
      value: getValue(e, state.scope.fieldName)
    })),
    ({ year, value }) => year && value
  )
  uniqueColumnValues = uniqueColumnValues.sort(
    (a, b) => a.year - b.year || a.value - b.value
  )

  const onRender = (row: any, _index: number, col: IColumn) => (
    <DurationColumn row={row} column={col} />
  )

  const columns = uniqueColumnValues.map(({ value }) => ({
    key: value,
    fieldName: value,
    name: state.scope.getColumnHeader(value),
    minWidth: 70,
    maxWidth: 70,
    onRender
  }))

  return [
    col(
      'label',
      '',
      {
        minWidth: 350,
        maxWidth: 350,
        isMultiline: true,
        isResizable: true
      },
      (row: ISummaryViewRow) => <LabelColumn {...row} />
    ),
    ...columns,
    col(
      'sum',
      t('common.sumLabel'),
      {
        minWidth: 50,
        maxWidth: 50,
        isResizable: false,
        data: { style: { fontWeight: 500 } }
      },
      onRender
    )
  ]
}

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
): ISummaryViewRow[] => {
  const rowValues = sortAlphabetically(
    unique(
      state.timeentries.map((e) => getValue(e, state.type.fieldName, null)),
      (r) => r
    )
  )
  const _columns = [...columns].splice(1, columns.length - 2)
  const rows: ISummaryViewRow[] = rowValues.map((label) => {
    const entries = state.timeentries.filter(
      (e) => getValue(e, state.type.fieldName, null) === label
    )
    return _columns.reduce(
      (object, col) => {
        const sum = [...entries]
          .filter((e) => getValue(e, state.scope.fieldName) === col.fieldName)
          .reduce((sum, { duration }) => sum + duration, 0)
        switch (state.type.key) {
          case 'project':
            {
              object.project = first(entries)?.project
              object.customer = first(entries)?.customer
            }
            break
          default:
            object.label = label
        }
        object[col.fieldName] = sum
        object.sum += sum
        return object
      },
      { sum: 0 } as ISummaryViewRow
    )
  })
  rows.push(
    _columns.reduce(
      (object, col) => {
        const sum = [...state.timeentries]
          .filter((e) => getValue(e, state.scope.fieldName) === col.fieldName)
          .reduce((sum, { duration }) => sum + duration, 0)
        object[col.fieldName] = sum
        object.sum += sum
        return object
      },
      { label: t('common.sumLabel'), sum: 0 }
    )
  )

  return rows
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
