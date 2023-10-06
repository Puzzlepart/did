/* eslint-disable unicorn/prevent-abbreviations */
import { IListColumn } from 'components/List'

/**
 * Creates a column definition for the `List` component.
 * This is a helper function to make it easier to create
 * column definitions.
 *
 * First template parameter (`T`) is the type of the item in the list,
 * and the second template parameter (`P`) is the type of the props
 * passed to the component rendering the column if a custom
 * render type is used.
 *
 * @param fieldName - Field name for the column
 * @param name -Name for the column
 * @param props - Additional props
 * @param onRender - Render function
 * @param minWidth - Min width
 */
export function createColumnDef<T extends object = any, P extends object = any>(
  fieldName: string,
  name = '',
  props: Partial<IListColumn<T, P>> = {},
  onRender?: (item?: T, index?: number, column?: IListColumn) => any,
  minWidth = 100
): IListColumn {
  const columnDef: IListColumn<T, P> = {
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
