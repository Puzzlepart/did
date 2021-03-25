import { MessageBarButton } from '@fluentui/react-react'
import { IGNORE_EVENT } from 'pages/Timesheet/reducer/actions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../../../types'
import { IIgnoreEventButtonProps } from './types'

export const IgnoreEventButton = ({
  event
}: IIgnoreEventButtonProps): JSX.Element => {
  const { t } = useTranslation()
  const { dispatch } = useTimesheetContext()
  return (
    <MessageBarButton
      text={t('timesheet.ignoreEventButtonLabel')}
      iconProps={{ iconName: 'Blocked2' }}
      onClick={() => dispatch(IGNORE_EVENT({ id: event.id }))}
    />
  )
}
