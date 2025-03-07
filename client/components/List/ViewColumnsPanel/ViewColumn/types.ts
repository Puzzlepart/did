import { IListColumn } from 'components'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'

export interface IViewColumnProps {
  index: number
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  column: IListColumn<any, any>
  onToggle: (key: string) => void
  onReorder: (sourceIndex: number, destinationIndex: number) => void
}
