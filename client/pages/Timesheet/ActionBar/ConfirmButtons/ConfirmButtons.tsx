import { ToolbarButton } from '@fluentui/react-components'
import React, { FC } from 'react'
import { IConfirmButtonsProps } from './types'
import { useConfirmButtons } from './useConfirmButtons'

/**
 * Renders the confirm and unconfirm buttons for a timesheet period.
 *
 * @returns A ToolbarButton with the appropriate icon and text, and
 * a click handler that calls the appropriate action.
 *
 * @category Timesheet
 */
export const ConfirmButtons: FC<IConfirmButtonsProps> = (props) => {
  const { buttonProps, buttonText, isConfirmDisabled } =
    useConfirmButtons(props)
  if (isConfirmDisabled) return null
  return <ToolbarButton {...buttonProps}>{buttonText}</ToolbarButton>
}

ConfirmButtons.displayName = 'ConfirmButtons'
ConfirmButtons.defaultProps = {
  icons: [
    ['CheckmarkCircle', 'green'],
    ['ArrowUndo', 'red']
  ]
}
