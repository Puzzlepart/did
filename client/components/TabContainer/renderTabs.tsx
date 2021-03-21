/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { IPivotItemProps, PivotItem } from 'office-ui-fabric-react'
import React, { JSXElementConstructor, ReactElement } from 'react'
import { isArray } from 'underscore'

/**
 * Renders the tabs for the `<TabContainer />`
 *
 * @param tabs - Items
 * @param props - Props
 */
export function renderTabs(tabs: any, props: Partial<IPivotItemProps>) {
  return tabs.map((item: ReactElement) => {
    if (isArray(item)) return renderTabs(item, props)
    const type = item?.type as JSXElementConstructor<any>
    switch (type?.name) {
      case 'PivotItem':
        return item
      default: {
        return (
          <PivotItem key={item.props.itemKey} {...item.props} {...props}>
            {item}
          </PivotItem>
        )
      }
    }
  })
}
