/* eslint-disable react-hooks/exhaustive-deps */
import {
  CommandBar,
  ICommandBarItemProps,
  ICommandBarProps,
  merge,
  SearchBox,
  Sticky,
  StickyPositionType
} from '@fluentui/react'
import React, { FC, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import _ from 'underscore'
import { cleanArray as clean } from 'utils'
import { useListContext } from '../context'
import { EXECUTE_SEARCH } from '../reducer'
import { IListHeaderProps } from './types'

export const ListHeader: FC<IListHeaderProps> = ({
  headerProps,
  defaultRender
}) => {
  const context = useListContext()
  const mergedHeaderProps = merge(headerProps, context.props.columnHeaderProps)
  const root = useRef(null)
  const timeout = useRef(null)
  const searchBoxItem: ICommandBarItemProps = context.props.searchBox && {
    key: 'SEARCH_BOX',
    onRender: () => (
      <SearchBox
        {...context.props.searchBox}
        styles={{
          root: { width: isMobile ? root?.current?.clientWidth : 500 },
          ...context.props.searchBox.styles
        }}
        defaultValue={context.state.searchTerm}
        onChange={(_event, searchTerm) => {
          clearTimeout(timeout.current)
          timeout.current = setTimeout(() => {
            if (context.props.searchBox.onChange)
              context.props.searchBox.onChange(_event, searchTerm)
            context.dispatch(EXECUTE_SEARCH({ searchTerm }))
          }, 250)
        }}
      />
    )
  }

  if (!!context.props.columnHeaderProps?.onRender) {
    return context.props.columnHeaderProps.onRender(
      mergedHeaderProps,
      defaultRender
    )
  }

  const commandBarProps: ICommandBarProps = {
    ...context.props.commandBar,
    items: clean([searchBoxItem, ...context.props.commandBar?.items]),
    farItems: context.props.commandBar?.farItems || []
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
      <CommandBar
        {...commandBarProps}
        hidden={
          _.isEmpty(commandBarProps.items) &&
          _.isEmpty(commandBarProps.farItems)
        }
        styles={{ root: { margin: 0, padding: 0 } }}
      />
      {defaultRender(mergedHeaderProps)}
    </Sticky>
  )
}
