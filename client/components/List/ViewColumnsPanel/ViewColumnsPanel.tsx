import { Checkbox, Label } from '@fluentui/react-components'
import { Panel } from 'components/Panel'
import React, { FC, useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useListContext } from '../context'
import styles from './ViewColumnsPanel.module.scss'

export const ViewColumnsPanel: FC = () => {
  const context = useListContext()
  const [columns, setColumns] = useState(context.props.columns)

  useEffect(() => {
    setColumns(context.props.columns)
  }, [context.props.columns])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(columns)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setColumns(items)
    // Here we would update the column order in the list context
    // This depends on the implementation of your list component
    // context.updateColumnOrder(items)
  }

  const handleToggleColumn = (key: string) => {
    const updatedColumns = columns.map(column => 
      column.key === key 
        ? { ...column, data: { ...column.data, hidden: !column.data?.hidden } }
        : column
    )
    setColumns(updatedColumns)
    // Update visibility in list context
    // context.updateColumnVisibility(key, !columns.find(col => col.key === key)?.data?.hidden)
  }

  return (
    <Panel
     open
     title='View Columns'
     description='Select columns to display in the list. Drag and drop to reorder columns.'>
      <div className={styles.columnsContainer}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.droppableArea}
              >
                {columns.map((column, index) => (
                  <Draggable key={column.key} draggableId={column.key} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${styles.columnItem} ${snapshot.isDragging ? styles.dragging : ''}`}
                      >
                        <Checkbox
                          checked={!column.data?.hidden}
                          onChange={() => handleToggleColumn(column.key)}
                        />
                        <Label>{column.name}</Label>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Panel>
  )
}
