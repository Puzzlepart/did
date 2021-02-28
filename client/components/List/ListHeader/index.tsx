import {
  Sticky,
  StickyPositionType,
  CommandBar,
  SearchBox
} from 'office-ui-fabric-react'
import React, { FunctionComponent, useMemo, useRef } from 'react'
import { IListHeaderProps } from './types'
import styles from './ListHeader.module.scss'

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

  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      <div className={styles.root}>
        <CommandBar
          {...props.commandBar}
          items={[searchBox, ...props.commandBar.items].filter((index) => index)}
          hidden={
            props.commandBar.items.length === 0 &&
            props.commandBar.farItems.length === 0
          }
          styles={{ root: { margin: 0, padding: 0 } }}
        />
        {props.defaultRender(props.headerProps)}
      </div>
    </Sticky>
  )
}
