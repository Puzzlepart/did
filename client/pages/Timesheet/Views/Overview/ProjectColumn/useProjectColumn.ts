/* eslint-disable unicorn/switch-case-braces */
import { IUserMessageProps } from 'components'
import { IUserMessageAction } from 'components/UserMessage/UserMessageAction/types'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { useTimesheetContext } from '../../../context'
import { TOGGLE_MANUAL_MATCH_PANEL } from '../../../reducer/actions'

/**
 * Hook for the project column.
 *
 * @param event The event object.
 */
export function useProjectColumn(event: EventObject) {
  const { t } = useTranslation('timesheet')
  const context = useTimesheetContext()
  let errorText = null
  let manualResolveAction: IUserMessageAction = {
    text: t('manuallyResolveEventActionTooltip', event),
    iconName: 'BoxSearch',
    iconColor: '#fff',
    onClick: () => {
      context.dispatch(TOGGLE_MANUAL_MATCH_PANEL({ event }))
    }
  }
  switch (event.error?.code) {
    case 'PROJECT_INACTIVE':
      {
        errorText = t('projectInactiveErrorText')
      }
      break
    case 'CUSTOMER_INACTIVE':
      {
        errorText = t('customerInactiveErrorText')
      }
      break
    case 'EVENT_NO_TITLE':
      {
        errorText = t('eventNoTitleErrorText')
        manualResolveAction = null
      }
      break
  }

  const errorMessage: IUserMessageProps = errorText && {
    text: errorText,
    intent: 'error',
    action: manualResolveAction
  }

  return { errorMessage }
}
