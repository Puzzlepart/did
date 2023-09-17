import { Caption1, Text, Tooltip } from '@fluentui/react-components'
import { DateObject } from 'DateUtils'
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
  const style = context.props.getColumnStyle(props.item)

  if (!fieldValue) return null

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
  }

  switch (props.column.renderAs) {
    case 'timeFromNow': {
      return <Caption1>{new DateObject(fieldValue).$.fromNow()}</Caption1>
    }
    default: {
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
