import { TooltipHost } from '@fluentui/react'
import get from 'get-value'
import React from 'react'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { IItemColumnProps } from './types'

export const ItemColumn: FC<IItemColumnProps> = (props) => {
  const fieldValue = get(props.item, props.column.fieldName)
  if (props.column.isMultiline && fieldValue?.length > 80) {
    return (
      <TooltipHost
        styles={{ root: { cursor: 'pointer' } }}
        content={(
          <div style={{ padding: '8px 20px' }}>
            <ReactMarkdown>{fieldValue}</ReactMarkdown>
          </div>
        )}>
        {fieldValue.slice(0, 80) + '...'}
      </TooltipHost>
    )
  }
  if (!props.column.onRender) return fieldValue
  return props.column.onRender(props.item, props.index, props.column)
}
