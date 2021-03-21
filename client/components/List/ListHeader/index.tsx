import {
  CommandBar,
  ICommandBarProps,
  IContextualMenuItem,
  SearchBox,
  Sticky,
  StickyPositionType
} from 'office-ui-fabric-react'
import React, { useMemo, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { isEmpty } from 'underscore'
import { EXECUTE_SEARCH } from '../reducer'
import styles from './ListHeader.module.scss'
import { IListHeaderProps } from './types'

export const ListHeader: React.FC<IListHeaderProps> = (
  props: IListHeaderProps
) => {
  const root = useRef(null)
  const timeout = useRef(null)

  const searchBoxItem = useMemo(() => {
    if (!props.searchBox) return null
    return {
      key: 'SEARCH_BOX',
      onRender: () => (
        <SearchBox
          {...props.searchBox}
          styles={{
            root: { width: isMobile ? root?.current?.clientWidth : 500 }
          }}
          value={props.state.searchTerm}
          onChange={(_event, searchTerm) => {
            clearTimeout(timeout.current)
            timeout.current = setTimeout(() => {
              if (props.searchBox.onChange)
                props.searchBox.onChange(_event, searchTerm)
              props.dispatch(EXECUTE_SEARCH({ searchTerm }))
            }, 250)
          }}
        />
      )
    } as IContextualMenuItem
  }, [props])

  const commandBarProps: ICommandBarProps = {
    ...(props.commandBar || {}),
    items: [searchBoxItem, ...(props.commandBar?.items || [])].filter(
      (item) => item
    ),
    farItems: props.commandBar?.farItems || []
  }

  props.headerProps.onRenderColumnHeaderTooltip = (props, defaultRender) => {
    const onRenderColumnHeader = props?.column?.data?.onRenderColumnHeader
    if (!onRenderColumnHeader) return defaultRender(props)
    return onRenderColumnHeader(props)
  }

  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      <div className={styles.root} ref={root}>
        <CommandBar
          {...commandBarProps}
          hidden={
            isEmpty(commandBarProps.items) && isEmpty(commandBarProps.farItems)
          }
          styles={{ root: { margin: 0, padding: 0 } }}
        />
        {props.defaultRender(props.headerProps)}
      </div>
    </Sticky>
  )
}
