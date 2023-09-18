import { ToolbarButton, ToolbarButtonProps } from '@fluentui/react-components'
import React, { CSSProperties, FC } from 'react'
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
}> = ({ item, buttonStyle, labelStyle }) => {
  if (item.hidden) return null
  const props = item.createProps<ToolbarButtonProps>({
    additionalStyles: buttonStyle
  })
  return (
    <ToolbarButton {...props}  >
      <span style={labelStyle}>{item.text}</span>
    </ToolbarButton>
  )
}

ListToolbarButton.defaultProps = {
  buttonStyle: {},
  labelStyle: {}
}
