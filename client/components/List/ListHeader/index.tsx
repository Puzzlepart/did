import { merge, Sticky, StickyPositionType } from '@fluentui/react'
import React, { FC, useMemo, useRef } from 'react'
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
  const stickyHeader = useMemo(
    () => (
      <Sticky
        ref={root}
        key='ListHeader'
        stickyPosition={StickyPositionType.Header}
        isScrollSynced={true}
      >
        <ListToolbar root={root} />
        {defaultRender(mergedHeaderProps)}
      </Sticky>
    ),
    []
  )

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

  return stickyHeader
}
