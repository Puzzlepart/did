import { IColumn } from 'components/List';
import * as React from 'react';

export interface IDurationColumnProps {
    row: any;
    column: IColumn;
}

/**
 * @component DurationColumn
 * @description 
 */
export const DurationColumn = ({ row, column }: IDurationColumnProps) => {
    let style: React.CSSProperties = column.data.style || {};
    if (row.label === 'Total') style.fontWeight = 500;
    return (
        <div style={style}>
            {row[column.fieldName]}
        </div>
    );
}