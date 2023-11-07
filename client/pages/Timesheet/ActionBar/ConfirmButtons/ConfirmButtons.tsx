import { ToolbarButton, Tooltip } from '@fluentui/react-components'
import { ConditionalWrapper } from 'components'
import React, { FC } from 'react'
import { IConfirmButtonsProps } from './types'
import { useConfirmButtons } from './useConfirmButtons'
import ReactMarkdown from 'react-markdown'

/**
 * Renders the confirm and unconfirm buttons for a timesheet period.
 *
 * @returns A `ToolbarButton` with the appropriate icon and text, and
 * a click handler that calls the appropriate action.
 *
 * @category Timesheet
 */
export const ConfirmButtons: FC<IConfirmButtonsProps> = (props) => {
  const { buttonProps, buttonText, tooltipText } = useConfirmButtons(props)
  return (
    <ConditionalWrapper
      condition={!!tooltipText}
      wrapper={(children) => (
        <Tooltip
          content={<ReactMarkdown>{tooltipText}</ReactMarkdown>}
          relationship='description'
        >
          {children}
        </Tooltip>
      )}
    >
      <ToolbarButton {...buttonProps}>{buttonText}</ToolbarButton>
    </ConditionalWrapper>
  )
}

ConfirmButtons.displayName = 'ConfirmButtons'
ConfirmButtons.defaultProps = {
  icons: [
    ['CheckmarkCircle', 'green'],
    ['CalendarCancel', 'red']
  ]
}
