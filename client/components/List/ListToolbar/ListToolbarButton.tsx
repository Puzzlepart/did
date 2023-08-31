import { ToolbarButton } from '@fluentui/react-components'
import React, { CSSProperties, FC } from 'react'
import { createStyle } from './createStyle'
import { ListMenuItem } from './ListMenuItem'

/**
 * Renders a toolbar button based on the provided list menu item.
 *
 * @param item The list menu item to render the toolbar button for.
 * @param buttonStyle The style to apply to the toolbar button.
 * @param labelStyle The style to apply to the toolbar button label.
 *
 * @returns The rendered toolbar button component.
 */
export const ListToolbarButton: FC<{
  item: ListMenuItem
  buttonStyle?: CSSProperties
  labelStyle?: CSSProperties
}> = (props) => {
  return (
    <ToolbarButton
      icon={ListMenuItem.createIcon(props.item)}
      title={props.item.text}
      style={createStyle(props.item, props.buttonStyle)}
      onClick={props.item.onClick}
      disabled={props.item.disabled}
    >
      <span style={props.labelStyle}>{props.item.text}</span>
    </ToolbarButton>
  )
}

ListToolbarButton.defaultProps = {
  buttonStyle: {},
  labelStyle: {}
}
