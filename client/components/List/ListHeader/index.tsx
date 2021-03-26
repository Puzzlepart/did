/* eslint-disable react-hooks/exhaustive-deps */
import {
  CommandBar,
  ICommandBarProps,

  SearchBox,
  Sticky,
  StickyPositionType
} from '@fluentui/react'
import React, { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { isEmpty } from 'underscore'
import { useListContext } from '../context'
import { EXECUTE_SEARCH } from '../reducer'
import { IListHeaderProps } from './types'

export const ListHeader: React.FC<IListHeaderProps> = ({
  headerProps,
  defaultRender
}) => {
  const { props, state, dispatch } = useListContext()
  const root = useRef(null)
  const timeout = useRef(null)
  const searchBoxItem = props.searchBox && {
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

  if (!!props.onRenderDetailsHeader) {
    return (
      <ListHeader
        headerProps={headerProps}
        defaultRender={defaultRender} />
    )
  }

  const commandBarProps: ICommandBarProps = {
    ...(props.commandBar || {}),
    items: [searchBoxItem, ...(props.commandBar?.items || [])].filter(
      (item) => item
    ),
    farItems: props.commandBar?.farItems || []
  }

  headerProps.onRenderColumnHeaderTooltip = (props, defaultRender) => {
    const onRenderColumnHeader = props?.column?.data?.onRenderColumnHeader
    if (!onRenderColumnHeader) return defaultRender(props)
    return onRenderColumnHeader(props)
  }

  return (
    <Sticky ref={root} stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      <CommandBar
        {...commandBarProps}
        hidden={
          isEmpty(commandBarProps.items) && isEmpty(commandBarProps.farItems)
        }
        styles={{ root: { margin: 0, padding: 0 } }}
      />
      {defaultRender(headerProps)}
    </Sticky>
  )
}
