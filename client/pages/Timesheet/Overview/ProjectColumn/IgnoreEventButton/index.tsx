import { MessageBarButton } from 'office-ui-fabric-react'
import { IGNORE_EVENT } from 'pages/Timesheet/reducer/actions'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TimesheetContext } from '../../../types'
import { IIgnoreEventButtonProps } from './types'

export const IgnoreEventButton = ({
  event
}: IIgnoreEventButtonProps): JSX.Element => {
  const { t } = useTranslation()
  const { dispatch } = useContext(TimesheetContext)
  return (
    <MessageBarButton
      text={t('timesheet.ignoreEventButtonLabel')}
      iconProps={{ iconName: 'Blocked2' }}
      onClick={() => dispatch(IGNORE_EVENT({ id: event.id }))}
    />
  )
}
