/* eslint-disable unicorn/prefer-ternary */
import React, { FC } from 'react'
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
  if (props.item.onRender) return props.item.onRender(null, null) as JSX.Element
  if (props.item.items) return <ListToolbarMenu {...props} />
  else return <ListToolbarButton {...props} />
}
