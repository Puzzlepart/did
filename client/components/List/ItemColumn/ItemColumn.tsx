/* eslint-disable unicorn/prefer-ternary */
import { Caption1, Text, Tooltip } from '@fluentui/react-components'
import get from 'get-value'
import React, { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { StyledComponent } from 'types'
import { useListContext } from '../context'
import styles from './ItemColumn.module.scss'
import { IItemColumnProps } from './types'
import { createRenderMap } from './createRenderMap'

export const ItemColumn: StyledComponent<IItemColumnProps> = (props) => {
  const context = useListContext()
  const fieldValue = get(props.item, props.column.fieldName)
  const style = context.props.getColumnStyle(props.item)

  // If there's a custom onRender function, call it regardless of fieldValue
  // The custom render function may want to handle null/undefined values
  if (props.column.onRender) {
    const element = props.column.onRender(
      props.item,
      props.index,
      props.column as any
    )
    return (
      <div className={ItemColumn.className} style={style}>
        {element}
      </div>
    )
  }

  // For default rendering, return null if there's no field value
  if (!fieldValue) return null

  const renderMap = createRenderMap(fieldValue, props)
  let element: ReactElement = null

  if (props.column.isMultiline && fieldValue?.length > 80) {
    element = (
      <Tooltip
        relationship='description'
        content={
          <div style={{ padding: '8px 20px' }}>
            <Text block weight='semibold' size={300}>
              {props.column.name}
            </Text>
            <Caption1>
              <ReactMarkdown>{fieldValue}</ReactMarkdown>
            </Caption1>
          </div>
        }
      >
        <Caption1>{fieldValue.slice(0, 80) + '...'}</Caption1>
      </Tooltip>
    )
  } else {
    if (renderMap.has(props.column.renderAs)) {
      return renderMap.get(props.column.renderAs)
    } else {
      element = <Text size={200}>{fieldValue}</Text>
    }
  }

  return (
    <div className={ItemColumn.className} style={style}>
      {element}
    </div>
  )
}

ItemColumn.displayName = 'ItemColumn'
ItemColumn.className = styles.itemColumn
