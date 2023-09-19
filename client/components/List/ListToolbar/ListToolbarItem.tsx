/* eslint-disable unicorn/prefer-ternary */
import React, { FC, ReactElement } from 'react'
import { ListMenuItem } from './ListMenuItem'
import { ListToolbarButton } from './ListToolbarButton'
import { ListToolbarMenu } from './ListToolbarMenu'

/**
 * Renders a toolbar item.
 *
 * @param item - The item to render.
 *
 * @returns The rendered toolbar item.
 */
export const ListToolbarItem: FC<{ item: ListMenuItem }> = (props) => {
  switch (props.item.componentType) {
    case 'custom': {
      return props.item.onRender(null, null) as ReactElement
    }
    case 'menu': {
      return <ListToolbarMenu {...props} />
    }
    default: {
      return <ListToolbarButton {...props} />
    }
  }
}
