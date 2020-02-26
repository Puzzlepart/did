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
    return (
        <div style={{ fontWeight: row.label && 500 }}>
            {row[column.fieldName]}
        </div>
    );
}