/* eslint-disable react/jsx-key */
import { Caption1, Persona } from '@fluentui/react-components'
import { Tag } from '@fluentui/react-tags-preview'
import { CustomerLink, ProjectLink, ProjectTag } from 'components'
import { DateObject } from 'DateUtils'
import React, { ReactElement } from 'react'

/**
 * Create a render map for custom rendering of field values.
 *
 * @param fieldValue - The value of the field
 * @param renderProps - The render props generated for the field value
 */
export function createRenderMap(fieldValue: any, renderProps: any) {
  const map = new Map<string, ReactElement>([
    [
      'timeFromNow',
      <Caption1>{new DateObject(fieldValue).$.fromNow()}</Caption1>
    ],
    ['customerLink', <CustomerLink customer={fieldValue} {...renderProps} />],
    ['projectLink', <ProjectLink project={fieldValue} {...renderProps} />],
    ['projectTag', <ProjectTag project={fieldValue} {...renderProps} />],
    ['tag', <Tag {...renderProps}>{fieldValue}</Tag>],
    ['persona', <Persona {...renderProps} />]
  ])
  return map
}
