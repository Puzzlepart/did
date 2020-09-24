import { DurationColumn } from 'components/DurationColumn'
import { LabelColumn } from 'components/LabelColumn'
import { sortAlphabetically, value } from 'helpers'
import { TFunction } from 'i18next'
import { IPivotItemProps } from 'office-ui-fabric-react'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import * as React from 'react'
import { first, unique } from 'underscore'
import { capitalize } from 'underscore.string'
import { moment } from 'utils/date'
import { generateColumn as col } from 'utils/generateColumn'
import { ISummaryViewRow, ISummaryViewState } from './types'

/**
 * Create columns
 *
 * @param {ISummaryViewState} state State of SummaryView component
 * @param {TFunction} t Translate function
 */
export function createColumns(state: ISummaryViewState, t: TFunction): IColumn[] {
    const data = unique(
        state.timeentries.map(e => e.monthNumber), m => m
    ).sort((a, b) => a - b)

    const onRender = (row: any, _index: number, col: IColumn) => (
        <DurationColumn row={row} column={col} />
    )

    let columns = data.map(key => ({
        key: key,
        fieldName: key,
        name: capitalize(moment().month(key - 1).format('MMMM')),
        minWidth: 70,
        maxWidth: 70,
        onRender,
    }))

    if (state.range < columns.length) {
        columns = columns.splice(data.length - state.range)
    }

    return [
        col(
            'label',
            '',
            {
                minWidth: 350,
                maxWidth: 350,
                isMultiline: true,
                isResizable: true,
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
                data: { style: { fontWeight: 500 } },
            },
            onRender,
        ),
    ]
}

/**
 * Create rows
 *
 * @param {ISummaryViewState} state State of SummaryView component
 * @param {IColumn[]} columns Columns
 * @param {TFunction} t Translate function
 */
export const createRows = (state: ISummaryViewState, columns: IColumn[], t: TFunction): ISummaryViewRow[] => {
    const uniqueRowValues = sortAlphabetically(
        unique(state.timeentries.map(e => value(e, state.type.fieldName, null)), r => r)
    )
    const _columns = [...columns].splice(1, columns.length - 2)
    const rows: ISummaryViewRow[] = uniqueRowValues.map(label => {
        const rowEntries = state.timeentries.filter(e => value(e, state.type.fieldName, null) === label)
        return _columns.reduce((obj, col) => {
            const sum = [...rowEntries]
                .filter(e => e.monthNumber === col.fieldName)
                .reduce((sum, { duration }) => sum + duration, 0)
            switch (state.type.key) {
                case 'project': {
                    obj.project = first(rowEntries)?.project
                    obj.customer = first(rowEntries)?.customer
                }
                    break
                default: obj.label = label
            }
            obj[col.fieldName] = sum
            obj.sum += sum
            return obj
        }, { sum: 0 } as ISummaryViewRow)
    })
    const totalRow: ISummaryViewRow = _columns.reduce((obj, col) => {
        const sum = [...state.timeentries]
            .filter(e => e.monthNumber === col.fieldName)
            .reduce((sum, { duration }) => sum + duration, 0)
        obj[col.fieldName] = sum
        obj.sum += sum
        return obj
    }, { label: t('common.sumLabel'), sum: 0 })

    rows.push(totalRow)

    return rows
}


/**
 * Create periods
 *
 * @param {number} range Range (default: 0)
 */
export function createPeriods(range = 0): IPivotItemProps[] {
    const periods = []
    for (let i = range; i >= 0; i--) {
        const key = (moment().year() - i).toString()
        periods.push({ key, itemKey: key, headerText: key })
    }
    return periods
}
