import {
  CommandBar,
  ICommandBarProps,
  SearchBox,
  Sticky,
  StickyPositionType
} from 'office-ui-fabric-react'
import React, { FunctionComponent, useMemo, useRef } from 'react'
import { isEmpty } from 'underscore'
import { EXECUTE_SEARCH } from '../reducer'
import styles from './ListHeader.module.scss'
import { IListHeaderProps } from './types'

export const ListHeader: FunctionComponent<IListHeaderProps> = (
  props: IListHeaderProps
) => {
  const timeout = useRef(null)

  const searchBox = useMemo(() => {
    if (!props.searchBox) return null
    return {
      key: 'SEARCH_BOX',
      onRender: () => (
        <SearchBox
          {...props.searchBox}
          className={styles.searchBox}
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
    }
  }, [props])

  const commandBarProps: ICommandBarProps = {
    ...(props.commandBar || {}),
    items: [searchBox, ...(props.commandBar?.items || [])].filter(
      (item) => item
    ),
    farItems: props.commandBar?.farItems || []
  }

  props.headerProps.onRenderColumnHeaderTooltip = (props, defaultRender) => {
    if (!props?.column.data?.onRenderColumnHeader) return defaultRender(props)
    return props?.column.data?.onRenderColumnHeader(props)
  }

  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      <div className={styles.root}>
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
