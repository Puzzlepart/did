import {
  MenuTrigger,
  ToolbarButton,
  ToolbarButtonProps
} from '@fluentui/react-components'
import React, { CSSProperties, FC } from 'react'
import _ from 'underscore'
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
  menuTrigger?: boolean
}> = (props) => {
  if (props.item.hidden) return null
  const toolbarButtonProps = props.item.createProps<ToolbarButtonProps>({
    additionalStyles: props.buttonStyle
  })
  if (props.menuTrigger) {
    return (
      <MenuTrigger disableButtonEnhancement>
        <ToolbarButton {..._.pick(toolbarButtonProps, 'icon', 'disabled')}>
          <span style={props.labelStyle}>{props.item.text}</span>
        </ToolbarButton>
      </MenuTrigger>
    )
  }
  return (
    <ToolbarButton {...toolbarButtonProps}>
      <span style={props.labelStyle}>{props.item.text}</span>
    </ToolbarButton>
  )
}

ListToolbarButton.defaultProps = {
  buttonStyle: {},
  labelStyle: {}
}
