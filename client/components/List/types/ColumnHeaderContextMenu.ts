import { IListColumn } from './IListColumn'

export type ColumnHeaderContextMenu = {
  column: IListColumn
  target: EventTarget & HTMLElement
}
