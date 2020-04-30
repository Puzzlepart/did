import { IColumn } from 'common/components/List';
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
    let style: React.CSSProperties = { ...column.data.style };
    if (row.label === 'Total') style.fontWeight = 500;
    let value = row[column.fieldName] ? Number.parseFloat(row[column.fieldName]).toFixed(2) : null;
    return (
        <div style={style}>
            {value}
        </div>
    );
}