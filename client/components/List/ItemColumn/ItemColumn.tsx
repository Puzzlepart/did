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

export const ItemColumn: StyledComponent<IItemColumnProps> = ({
  column,
  item
}) => {
  const context = useListContext()
  const fieldValue = get(item, column.fieldName)
  const style = context.props.getColumnStyle(item)

  if (!fieldValue) return null
  let renderProps = {}
  if (column.createRenderProps) {
    renderProps = column.createRenderProps(item)
  }

  let element: ReactElement = null
  if (column.isMultiline && fieldValue?.length > 80) {
    element = (
      <Tooltip
        relationship='description'
        content={
          <div style={{ padding: '8px 20px' }}>
            <Text block weight='semibold' size={300}>
              {column.name}
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
    const renderMap = createRenderMap(fieldValue, renderProps)
    if (renderMap.has(column.renderAs)) {
      return renderMap.get(column.renderAs)
    } else {
      if (column.onRender) {
        element = column.onRender(item)
      } else element = <Text size={200}>{fieldValue}</Text>
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
