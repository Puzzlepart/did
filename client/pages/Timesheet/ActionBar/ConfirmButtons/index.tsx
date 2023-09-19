import { ToolbarButton } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useConfirmButtons } from './useConfirmButtons'

/**
 * Renders the confirm and unconfirm buttons for a timesheet period.
 *
 * @returns A React functional component.
 */
export const ConfirmButtons: FC = () => {
  const { buttonProps, buttonText, isConfirmDisabled } = useConfirmButtons()
  if (isConfirmDisabled) return null
  return (
    <>
      <ToolbarButton {...buttonProps}>{buttonText}</ToolbarButton>
    </>
  )
}
