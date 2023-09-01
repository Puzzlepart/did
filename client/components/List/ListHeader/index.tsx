import { merge } from '@fluentui/react'
import React, { FC, useRef } from 'react'
import { useListContext } from '../context'
import { ListToolbar } from '../ListToolbar'
import { IListHeaderProps } from './types'

export const ListHeader: FC<IListHeaderProps> = ({
  headerProps,
  defaultRender
}) => {
  const context = useListContext()
  const mergedHeaderProps = merge(headerProps, context.props.columnHeaderProps)
  const root = useRef(null)
  const hideToolbar =
    context.props.menuItems?.length === 0 &&
    context.props.commandBar?.items?.length === 0 &&
    context.props.commandBar?.farItems?.length === 0

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

  return hideToolbar ? (
    defaultRender(mergedHeaderProps)
  ) : (
    <div ref={root}>
      <ListToolbar root={root} />
      {defaultRender(mergedHeaderProps)}
    </div>
  )
}
