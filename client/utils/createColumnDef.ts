/* eslint-disable unicorn/prevent-abbreviations */
import { IListColumn } from 'components/List'

/**
 * Creates a column definition for the `List` component.
 * This is a helper function to make it easier to create
 * column definitions.
 *
 * @param fieldName - Field name for the column
 * @param name -Name for the column
 * @param props - Additional props
 * @param onRender - Render function
 * @param minWidth - Min width
 */
export function createColumnDef<T extends object = any>(
  fieldName: string,
  name = '',
  props: Partial<IListColumn<T>> = {},
  onRender?: (item?: T, index?: number, column?: IListColumn) => any,
  minWidth = 100
): IListColumn {
  const columnDef: IListColumn = {
    key: fieldName,
    fieldName,
    name,
    minWidth,
    onRender,
    isResizable: true,
    data: {},
    ...props
  }
  return columnDef
}
