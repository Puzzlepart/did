import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

/**
 * Generate a IColumn defintion
 * 
 * @param {string} fieldName Field name
 * @param {string} name Name
 * @param {Partial<IColumn>} props Additional props
 * @param {function} onRender On render function (optional)
 * @param {number} minWidth Min width (defaults to 100)
 * 
 * @category Utility
 */
export function generateColumn(fieldName: string, name: string = '', props: Partial<IColumn> = {}, onRender?: any, minWidth: number = 100): IColumn {
    return {
        key: fieldName,
        fieldName,
        name,
        minWidth,
        onRender,
        isResizable: true,
        ...{ data: {}, ...props },
    } as IColumn;
}