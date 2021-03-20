import { IListColumn } from 'components/List/types'

/**
 * Generate a `IListColumn` defintion
 *
 * @param fieldName - Field name
 * @param name -Name
 * @param props - Additional props
 * @param onRender - Render function
 * @param minWidth - Min width
 */
export function generateColumn(
  fieldName: string,
  name = '',
  props: Partial<IListColumn> = {},
  onRender?: (item?: any, index?: number, column?: IListColumn) => any,
  minWidth = 100
): IListColumn {
  return {
    key: fieldName,
    fieldName,
    name,
    minWidth,
    onRender,
    isResizable: true,
    ...{ data: {}, ...props }
  } as IListColumn
}
