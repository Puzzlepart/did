import { IColumn } from 'office-ui-fabric-react'

/**
 * Generate a IColumn defintion
 *
 * @param fieldName - Field name
 * @param name -Name
 * @param props - Additional props
 * @param onRender - On render function
 * @param minWidth - Min width
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
