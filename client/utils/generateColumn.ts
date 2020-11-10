import { IColumn } from 'office-ui-fabric'

/**
 * Generate a IColumn defintion
 *
 * @param {string} fieldName Field name
 * @param {string} name Name
 * @param {Partial<IColumn>} props Additional props
 * @param {function} onRender On render function (optional)
 * @param {number} minWidth Min width (defaults to 100)
 */
export function generateColumn(
  fieldName: string,
  name = '',
  props: Partial<IColumn> = {},
  onRender?: (item?: any, index?: number, column?: IColumn) => any,
  minWidth = 100
): IColumn {
  return {
    key: fieldName,
    fieldName,
    name,
    minWidth,
    onRender,
    isResizable: true,
    ...{ data: {}, ...props }
  } as IColumn
}
