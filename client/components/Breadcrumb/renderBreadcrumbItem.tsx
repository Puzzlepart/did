import {
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem
} from '@fluentui/react-breadcrumb-preview'
import React from 'react'
import { IBreadcrumbItem } from './types'

/**
 * Renders a single breadcrumb item.
 *
 * @param item - The item to render.
 * @param items - The list of items to render.
 *
 * @returns The rendered breadcrumb item.
 */
export function renderBreadcrumbItem(
  item: IBreadcrumbItem,
  items: IBreadcrumbItem[]
) {
  const isLastItem = items.length - 1 === item.key
  return (
    <React.Fragment key={`item-${item.key}`}>
      <BreadcrumbItem current={isLastItem}>
        {item.onClick ? (
          <BreadcrumbButton onClick={item.onClick} current={isLastItem}>
            {item.value}
          </BreadcrumbButton>
        ) : (
          item.value
        )}
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  )
}
