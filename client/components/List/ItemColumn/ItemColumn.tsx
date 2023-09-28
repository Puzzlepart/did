/* eslint-disable unicorn/prefer-ternary */
import { Caption1, Text, Tooltip } from '@fluentui/react-components'
import { DateObject } from 'DateUtils'
import { CustomerLink, ProjectLink, ProjectTag } from 'components'
import get from 'get-value'
import React, { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { StyledComponent } from 'types'
import { useListContext } from '../context'
import styles from './ItemColumn.module.scss'
import { IItemColumnProps } from './types'

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
    switch (column.renderAs) {
      case 'timeFromNow': {
        return <Caption1>{new DateObject(fieldValue).$.fromNow()}</Caption1>
      }
      case 'customerLink': {
        return <CustomerLink customer={fieldValue} />
      }
      case 'projectLink': {
        return <ProjectLink project={fieldValue} {...renderProps} />
      }
      case 'projectTag': {
        return <ProjectTag project={fieldValue}  {...renderProps} />
      }
      default: {
        if (column.onRender) {
          element = column.onRender(item)
        } else element = <Text size={200}>{fieldValue}</Text>
      }
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
