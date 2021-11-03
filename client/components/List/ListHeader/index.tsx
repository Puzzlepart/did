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
import React, { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import _ from 'underscore'
import { cleanArray as clean } from 'utils'
import { useListContext } from '../context'
import { EXECUTE_SEARCH } from '../reducer'
import { IListHeaderProps } from './types'

export const ListHeader: React.FC<IListHeaderProps> = ({
  headerProps,
  defaultRender
}) => {
  const { props, state, dispatch } = useListContext()
  const mergedHeaderProps = merge(headerProps, props.columnHeaderProps)
  const root = useRef(null)
  const timeout = useRef(null)
  const searchBoxItem: ICommandBarItemProps = props.searchBox && {
    key: 'SEARCH_BOX',
    onRender: () => (
      <SearchBox
        {...props.searchBox}
        styles={{
          root: { width: isMobile ? root?.current?.clientWidth : 500 }
        }}
        defaultValue={state.searchTerm}
        onChange={(_event, searchTerm) => {
          clearTimeout(timeout.current)
          timeout.current = setTimeout(() => {
            if (props.searchBox.onChange)
              props.searchBox.onChange(_event, searchTerm)
            dispatch(EXECUTE_SEARCH({ searchTerm }))
          }, 250)
        }}
      />
    )
  }

  if (!!props.columnHeaderProps?.onRender) {
    return props.columnHeaderProps.onRender(mergedHeaderProps, defaultRender)
  }

  const commandBarProps: ICommandBarProps = {
    ...props.commandBar,
    items: clean([searchBoxItem, ...props.commandBar?.items]),
    farItems: props.commandBar?.farItems || []
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
