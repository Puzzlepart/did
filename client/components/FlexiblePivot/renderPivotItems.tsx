/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { IPivotItemProps, PivotItem } from 'office-ui-fabric-react'
import React, { JSXElementConstructor, ReactElement } from 'react'

/**
 * Renders the items for the `<FlexiblePivot />`
 *
 * @param items - Items
 * @param itemProps - Item props
 */
export function renderPivotItems(
  items: any,
  itemProps: Partial<IPivotItemProps>
) {
  return items.map((item: ReactElement) => {
    const type = item.type as JSXElementConstructor<any>
    switch (type.name) {
      case 'PivotItem':
        return item
      default: {
        return (
          <PivotItem key={item.props.itemKey} {...item.props} {...itemProps}>
            {item}
          </PivotItem>
        )
      }
    }
  })
}
