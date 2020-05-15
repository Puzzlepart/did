import { value } from 'helpers';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IDurationColumnProps } from './IDurationColumnProps';

/**
 * @component DurationColumn
 * @category Timesheet
 */
export const DurationColumn = ({ row, column }: IDurationColumnProps) => {
    const { t } = useTranslation('COMMON');
    const style = { ...value<any>(column, 'data.style', {}) };

    if (row.label === t('SUM_LABEL')) style.fontWeight = 500;

    const colValue = row[column.fieldName]
        ? Number.parseFloat(row[column.fieldName]).toFixed(2)
        : null;

    return (
        <div style={style}>
            {colValue}
        </div>
    );
}