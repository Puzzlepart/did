import { TooltipHost } from '@fluentui/react'
import get from 'get-value'
import React, { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { StyledComponent } from 'types'
import { useListContext } from '../context'
import styles from './ItemColumn.module.scss'
import { IItemColumnProps } from './types'

export const ItemColumn: StyledComponent<IItemColumnProps> = (props) => {
  const context = useListContext()
  const fieldValue = get(props.item, props.column.fieldName)

  let element: ReactElement = null
  if (props.column.isMultiline && fieldValue?.length > 80) {
    element = (
      <TooltipHost
        styles={{ root: { cursor: 'pointer' } }}
        content={
          <div style={{ padding: '8px 20px' }}>
            <ReactMarkdown>{fieldValue}</ReactMarkdown>
          </div>
        }
      >
        {fieldValue.slice(0, 80) + '...'}
      </TooltipHost>
    )
  } else {
    element = props.column.onRender
      ? props.column.onRender(props.item, props.index, props.column as any)
      : fieldValue
  }

  const style = context.props.getColumnStyle(props.item)

  return (
    <div className={ItemColumn.className} style={style}>
      {element}
    </div>
  )
}

ItemColumn.displayName = 'ItemColumn'
ItemColumn.className = styles.itemColumn
