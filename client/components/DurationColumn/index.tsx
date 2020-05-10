import { value } from 'helpers';
import resource from 'i18n';
import * as React from 'react';
import { IDurationColumnProps } from './IDurationColumnProps';

/**
 * @component DurationColumn
 * @category Timesheet
 */
export const DurationColumn = ({ row, column }: IDurationColumnProps) => {
    const style = { ...value<any>(column, 'data.style', {}) };

    if (row.label === resource('COMMON.SUM_LABEL')) style.fontWeight = 500;

    const colValue = row[column.fieldName]
        ? Number.parseFloat(row[column.fieldName]).toFixed(2)
        : null;

    return (
        <div style={style}>
            {colValue}
        </div>
    );
}