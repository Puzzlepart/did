import { ToolbarButton } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { IReloadButtonProps } from './types'
import { useTimesheetContext } from 'pages/Timesheet/context'

export const ReloadButton: FC<IReloadButtonProps> = (props) => {
  const { t } = useTranslation()
  const context = useTimesheetContext()
  if (
    context.state?.selectedPeriod?.isConfirmed ||
    Boolean(context.state.loading)
  ) {
    return null
  }
  return (
    <ToolbarButton
      hidden
      icon={icon(props.iconName)}
      title={t('timesheet.reloadButtonTooltip')}
      onClick={() => context.refetch({ cache: props.cache })}
    >
      {t('timesheet.reloadButtonText')}
    </ToolbarButton>
  )
}

ReloadButton.displayName = 'ReloadButton'
ReloadButton.defaultProps = {
  iconName: 'ClockArrowDownload',
  cache: false
}
