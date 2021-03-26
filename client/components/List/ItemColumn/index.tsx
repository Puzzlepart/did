import { getValue } from 'helpers'
import React from 'react'
import { IItemColumnProps } from './types'

export const ItemColumn: React.FC<IItemColumnProps> = ({
  column,
  item,
  index
}) => {
  if (!!column.onRender) {
    return column.onRender(item, index, column)
  }
  return getValue(item, column.fieldName)
}
