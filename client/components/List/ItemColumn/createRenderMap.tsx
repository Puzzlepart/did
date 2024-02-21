/* eslint-disable react/jsx-key */
import { Caption1, Persona } from '@fluentui/react-components'
import { Tag } from '@fluentui/react-tags-preview'
import {
  CustomerLink,
  IItemColumnProps,
  ItemColumnRenderType,
  ProjectLink,
  ProjectTag
} from 'components'
import { DateObject } from 'DateUtils'
import React, { ReactElement } from 'react'

/**
 * Create a render map for custom rendering of field values.
 *
 * @param fieldValue - The value of the field
 * @param props - The props passed to the `ItemColumn` component
 */
export function createRenderMap(fieldValue: any, props: IItemColumnProps) {
  const customRenderProps = props.column.createRenderProps
    ? props.column.createRenderProps(props.item)
    : {}
  return new Map<ItemColumnRenderType, ReactElement>([
    [
      'timeFromNow',
      <Caption1>{new DateObject(fieldValue).$.fromNow()}</Caption1>
    ],
    [
      'customerLink',
      <CustomerLink customer={fieldValue} {...customRenderProps} />
    ],
    [
      'projectLink',
      <ProjectLink project={fieldValue} {...customRenderProps} />
    ],
    ['projectTag', <ProjectTag project={fieldValue} {...customRenderProps} />],
    ['tag', <Tag {...customRenderProps}>{fieldValue}</Tag>],
    ['persona', <Persona {...customRenderProps} />]
  ])
}
