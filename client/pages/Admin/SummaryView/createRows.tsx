import { sortAlphabetically, value } from 'helpers'
import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { unique } from 'underscore'
import { ISummaryViewState } from './types'


export const createRows = (
    { timeentries, scope, type }: ISummaryViewState,
    columns: IColumn[],
    t: TFunction
) => {
    const uniqueRowValues = sortAlphabetically(
        unique(timeentries.map(e => value(e, type.fieldName, null)), r => r)
    )
    const _columns = [...columns].splice(1, columns.length - 2)
    const rows = uniqueRowValues.map(label => {
        const rowEntries = timeentries.filter(e => value(e, type.fieldName, null) === label)
        return _columns.reduce((obj, col) => {
            const sum = [...rowEntries]
                .filter(e => value(e, scope.fieldName, null) === col.fieldName)
                .reduce((sum, { duration }) => sum + duration, 0)
            obj[col.fieldName] = sum
            obj.sum += sum
            return obj
        }, { label, sum: 0 })
    })
    const totalRow = _columns.reduce((obj, col) => {
        const sum = [...timeentries]
            .filter(e => value(e, scope.fieldName, null) === col.fieldName)
            .reduce((sum, { duration }) => sum + duration, 0)
        obj[col.fieldName] = sum
        obj.sum += sum
        return obj
    }, { label: t('sumLabel'), sum: 0 })

    rows.push(totalRow)

    return rows
}