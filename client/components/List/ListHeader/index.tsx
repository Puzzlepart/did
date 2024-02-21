import { merge } from '@fluentui/react'
import { mergeClasses } from '@fluentui/react-components'
import React, { useRef } from 'react'
import { StyledComponent } from 'types'
import { useListContext } from '../context'
import { ListToolbar } from '../ListToolbar'
import styles from './ListHeader.module.scss'
import { IListHeaderProps } from './types'

export const ListHeader: StyledComponent<IListHeaderProps> = ({
  headerProps,
  defaultRender
}) => {
  const context = useListContext()
  const mergedHeaderProps = merge(headerProps, context.props.columnHeaderProps)
  const root = useRef(null)
  const hideToolbar =
    context.props.menuItems?.length === 0 &&
    context.props.commandBar?.items?.length === 0 &&
    context.props.commandBar?.farItems?.length === 0 &&
    !context.props.searchBox

  if (!!context.props.columnHeaderProps?.onRender) {
    return (
      <div
        className={mergeClasses(
          ListHeader.className,
          context.props.minmalHeaderColumns && styles.minimalHeaderColumns
        )}
      >
        {context.props.columnHeaderProps.onRender(
          mergedHeaderProps,
          defaultRender
        )}
      </div>
    )
  }

  headerProps.onRenderColumnHeaderTooltip = (props, defaultRender) => {
    const onRenderColumnHeader = props?.column?.data?.onRenderColumnHeader
    if (!onRenderColumnHeader) return defaultRender(props)
    return onRenderColumnHeader(props)
  }

  return hideToolbar ? (
    <div
      className={mergeClasses(
        ListHeader.className,
        context.props.minmalHeaderColumns && styles.minimalHeaderColumns
      )}
    >
      {defaultRender(mergedHeaderProps)}
    </div>
  ) : (
    <div
      ref={root}
      className={mergeClasses(
        ListHeader.className,
        context.props.minmalHeaderColumns && styles.minimalHeaderColumns
      )}
    >
      {!hideToolbar && <ListToolbar />}
      {defaultRender(mergedHeaderProps)}
    </div>
  )
}

ListHeader.displayName = 'ListHeader'
ListHeader.className = styles.listHeader
