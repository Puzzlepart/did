import { IColumn } from 'components/List';
import resource from 'i18n';
import * as React from 'react';

export interface IDurationColumnProps {
    row: any;
    column: IColumn;
}

/**
 * @component DurationColumn
 * @category Timesheet
 */
export const DurationColumn = ({ row, column }: IDurationColumnProps) => {
    const style: React.CSSProperties = { ...column.data.style };
    if (row.label === resource('COMMON.SUM_LABEL')) style.fontWeight = 500;
    const value = row[column.fieldName] ? Number.parseFloat(row[column.fieldName]).toFixed(2) : null;
    return (
        <div containerStyle={style}>
            {value}
        </div>
    );
}