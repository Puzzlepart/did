import { value } from 'helpers'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { IDurationColumnProps } from './IDurationColumnProps'

/**
 * @component DurationColumn
 * @category Timesheet
 */
export const DurationColumn = ({ row, column }: IDurationColumnProps) => {
    const { t } = useTranslation('common')
    const style: React.CSSProperties = { ...value<any>(column, 'data.style', {}) }

    if (row.label === t('sumLabel') || column.fieldName === 'sum') style.fontWeight = 600

    const duration = row[column.fieldName]
        ? Number.parseFloat(row[column.fieldName]).toFixed(2)
        : null

    return (
        <div style={style}>
            {duration}
        </div>
    )
}