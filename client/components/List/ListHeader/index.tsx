import {
  CommandBar,
  ICommandBarProps,
  SearchBox,
  Sticky,
  StickyPositionType
} from 'office-ui-fabric-react'
import React, { FunctionComponent, useMemo, useRef } from 'react'
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
          onChange={(_event, newValue) => {
            clearTimeout(timeout.current)
            timeout.current = setTimeout(() => {
              if (props.searchBox.onChange)
                props.searchBox.onChange(_event, newValue)
              props.dispatch({ type: 'SEARCH', payload: newValue })
            }, 750)
          }}
        />
      )
    }
  }, [props])

  const commandBarProps: ICommandBarProps = {
    ...(props.commandBar || {}),
    items: [],
    farItems: []
  }

  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      <div className={styles.root}>
        <CommandBar
          {...commandBarProps}
          items={[searchBox, ...commandBarProps.items].filter((item) => item)}
          hidden={
            commandBarProps.items.length === 0 &&
            commandBarProps.farItems.length === 0
          }
          styles={{ root: { margin: 0, padding: 0 } }}
        />
        {props.defaultRender(props.headerProps)}
      </div>
    </Sticky>
  )
}
