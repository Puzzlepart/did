/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { ContextUser } from 'AppContext'
import { PivotItem } from '@fluentui/react-react'
import React, { JSXElementConstructor, ReactElement } from 'react'
import { isArray } from 'underscore'
import { ITabItemProps } from './types'

type RenderTabs = {
  tabs: any
  props: ITabItemProps
  user: ContextUser
}

/**
 * Renders the tabs for the `<TabContainer />`
 */
export function renderTabs({ tabs, props, user }: RenderTabs) {
  return tabs.map((item: ReactElement) => {
    if (isArray(item)) return renderTabs({ tabs: item, props, user })
    if (item.props.hidden) return null
    if (item.props.permission && !user.hasPermission(item.props.permission)) {
      return null
    }
    const type = item?.type as JSXElementConstructor<any>
    switch (type?.name) {
      case 'PivotItem':
        return item
      default: {
        const mergedProps = {
          itemKey: type?.name.toLowerCase(),
          ...item.props,
          props
        }
        return (
          <PivotItem key={mergedProps.itemKey} {...mergedProps}>
            {item}
          </PivotItem>
        )
      }
    }
  })
}
