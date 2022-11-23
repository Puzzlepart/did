import get from 'get-value'
import { FC } from 'react'
import { IItemColumnProps } from './types'

export const ItemColumn: FC<IItemColumnProps> = ({ column, item, index }) => {
  if (!column.onRender) return get(item, column.fieldName)
  return column.onRender(item, index, column)
}
