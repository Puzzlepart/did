/* eslint-disable unicorn/prefer-ternary */
import React, { FC } from 'react'
import { ListMenuItem } from './ListMenuItem'
import { ListToolbarMenu } from './ListToolbarMenu'
import { ListToolbarButton } from './ListToolbarButton'

/**
 * Renders a toolbar item.
 *
 * @param item - The item to render.
 *
 * @returns The rendered toolbar item.
 */
export const ListToolbarItem: FC<{ item: ListMenuItem }> = ({ item }) => {
  if (item.items) return <ListToolbarMenu item={item} />
  else return <ListToolbarButton item={item} />
}
