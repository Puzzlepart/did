import { Checkbox, Label, mergeClasses } from '@fluentui/react-components'
import { Panel } from 'components/Panel'
import React, { FC } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import styles from './ViewColumnsPanel.module.scss'
import { useDragAndDrop, useViewColumnsPanel } from './hooks'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'
import { useListContext } from '../context'
import { TOGGLE_VIEW_COLUMNS_PANEL } from '../reducer'

/**
 * Component to display and manage list columns, allowing users to:
 * 1. Toggle column visibility
 * 2. Reorder columns via drag and drop
 */
export const ViewColumnsPanel: FC = () => {
  const { t } = useTranslation()
  const context = useListContext()
  const { columns, toggleColumnVisibility, reorderColumns } =
    useViewColumnsPanel()
  const { handleDragEnd } = useDragAndDrop(reorderColumns)

  return (
    <Panel
      {...context.state.viewColumnsPanel}
      onDismiss={() => context.dispatch(TOGGLE_VIEW_COLUMNS_PANEL())}
      title={t('list.viewColumnsPanel.title')}
      description={t('list.viewColumnsPanel.description')}
    >
      <div className={styles.columnsContainer}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='columns'>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.droppableArea}
              >
                {columns.map((column, index) => (
                  <Draggable
                    key={column.key}
                    draggableId={column.key}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={mergeClasses(
                          styles.columnItem,
                          snapshot.isDragging ? styles.dragging : ''
                        )}
                      >
                        <Checkbox
                          disabled={column.data?.required}
                          checked={!column.data?.hidden}
                          onChange={() => toggleColumnVisibility(column.key)}
                        />
                        <Label className={styles.label}>{column.name}</Label>
                        <div
                          className={styles.moveUp}
                          onClick={() => reorderColumns(index, index - 1)}
                          title={t('list.viewColumnsPanel.moveUp')}
                        >
                          {getFluentIcon('ChevronUp', { size: 24 })}
                        </div>
                        <div
                          className={styles.moveDown}
                          onClick={() => reorderColumns(index, index + 1)}
                          title={t('list.viewColumnsPanel.moveDown')}
                        >
                          {getFluentIcon('ChevronDown', { size: 24 })}
                        </div>
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
