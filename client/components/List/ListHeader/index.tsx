/* eslint-disable react-hooks/exhaustive-deps */
import {
  merge,
  Sticky,
  StickyPositionType
} from '@fluentui/react'
import React, { FC, useRef } from 'react'
import { useListContext } from '../context'
import { Toolbar } from '../Toolbar'
import { IListHeaderProps } from './types'

export const ListHeader: FC<IListHeaderProps> = ({
  headerProps,
  defaultRender
}) => {
  const context = useListContext()
  const mergedHeaderProps = merge(headerProps, context.props.columnHeaderProps)
  const root = useRef(null)

  if (!!context.props.columnHeaderProps?.onRender) {
    return context.props.columnHeaderProps.onRender(
      mergedHeaderProps,
      defaultRender
    )
  }

  headerProps.onRenderColumnHeaderTooltip = (props, defaultRender) => {
    const onRenderColumnHeader = props?.column?.data?.onRenderColumnHeader
    if (!onRenderColumnHeader) return defaultRender(props)
    return onRenderColumnHeader(props)
  }

  return (
    <Sticky
      ref={root}
      stickyPosition={StickyPositionType.Header}
      isScrollSynced={true}
    >
      <Toolbar root={root} />
      {defaultRender(mergedHeaderProps)}
    </Sticky>
  )
}
