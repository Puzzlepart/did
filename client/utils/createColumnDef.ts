/* eslint-disable unicorn/prevent-abbreviations */
import { IListColumn } from 'components/List/types'

/**
 * Creates a column definition for the `List` component.
 * This is a helper function to make it easier to create
 * column definitions.
 *
 * @param fieldName - Field name
 * @param name -Name
 * @param props - Additional props
 * @param onRender - Render function
 * @param minWidth - Min width
 */
export function createColumnDef<T = any>(
  fieldName: string,
  name = '',
  props: Partial<IListColumn<T>> = {},
  onRender?: (item?: T, index?: number, column?: IListColumn<T>) => any,
  minWidth = 100
): IListColumn<T> {
  return {
    key: fieldName,
    fieldName,
    name,
    minWidth,
    onRender,
    isResizable: true,
    data: {},
    ...props
  } as IListColumn<T>
}
