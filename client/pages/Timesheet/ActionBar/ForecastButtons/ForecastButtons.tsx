import { ToolbarButton } from '@fluentui/react-components'
import React, { FC } from 'react'
import { IForecastButtonsProps } from './types'
import { useForecastButtons } from './useForecastButtons'

/**
 * Renders the forecast and unforecast buttons for a timesheet period.
 *
 * @returns A `ToolbarButton` with the appropriate icon and text, and
 * a click handler that calls the appropriate action.
 *
 * @category Timesheet
 */
export const ForecastButtons: FC<IForecastButtonsProps> = (props) => {
  const { buttonProps, buttonText, isForecastDisabled } =
    useForecastButtons(props)
  if (isForecastDisabled) return null
  return <ToolbarButton {...buttonProps}>{buttonText}</ToolbarButton>
}

ForecastButtons.displayName = 'ForecastButtons'
ForecastButtons.defaultProps = {
  icons: [
    ['Timer', 'blue'],
    ['ArrowUndo', '#ff9999']
  ]
}
