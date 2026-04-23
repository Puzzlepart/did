import { Panel } from 'components/Panel'
import React, { FC, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useListContext } from '../context'
import { TOGGLE_VIEW_COLUMNS_PANEL } from '../reducer'
import { useDragAndDrop, useViewColumnsPanel } from './hooks'
import { ViewColumn } from './ViewColumn'
import styles from './ViewColumnsPanel.module.scss'

/**
 * Component to display and manage list columns, allowing users to:
 * 1. Toggle column visibility
 * 2. Reorder columns via drag and drop
 */
export const ViewColumnsPanel: FC = () => {
  const { t } = useTranslation()
  const context = useListContext()
  const {
    columns,
    toggleColumnVisibility,
    reorderColumns,
    takeSnapshot,
    cancel,
    reset
  } = useViewColumnsPanel()
  const { handleDragEnd } = useDragAndDrop(reorderColumns)
  const isOpen = context.state.viewColumnsPanel?.open

  useEffect(() => {
    if (isOpen) takeSnapshot()
  }, [isOpen])

  const dismiss = () => context.dispatch(TOGGLE_VIEW_COLUMNS_PANEL())

  const onCancel = () => {
    cancel()
    dismiss()
  }

  return (
    <Panel
      {...context.state.viewColumnsPanel}
      onDismiss={dismiss}
      title={t('list.viewColumnsPanel.title')}
      description={t('list.viewColumnsPanel.description')}
      headerActions={[
        {
          text: t('common.resetButtonLabel', { defaultValue: 'Reset' }),
          appearance: 'subtle',
          onClick: reset
        },
        {
          text: t('common.save'),
          appearance: 'primary',
          onClick: dismiss
        },
        {
          text: t('common.cancelButtonLabel'),
          appearance: 'subtle',
          onClick: onCancel
        }
      ]}
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
                      <ViewColumn
                        index={index}
                        provided={provided}
                        snapshot={snapshot}
                        column={column}
                        onToggle={toggleColumnVisibility}
                        onReorder={reorderColumns}
                      />
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
