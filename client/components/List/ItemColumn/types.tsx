import { HTMLAttributes } from 'react'
import { IListColumn } from '../types'

export interface IItemColumnProps extends HTMLAttributes<HTMLDivElement> {
  item: any
  index: number
  column: IListColumn
}