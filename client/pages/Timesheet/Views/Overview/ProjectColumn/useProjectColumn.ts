import { IUserMessageProps } from 'components'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'

/**
 * Hook for the project column.
 * 
 * @param event The event object.
 */
export function useProjectColumn(event: EventObject) {
  const { t } = useTranslation('timesheet')
  let errorText = null
  switch (event.error?.code) {
    case 'PROJECT_INACTIVE': {
      errorText = t('projectInactiveErrorText')
    }
    case 'CUSTOMER_INACTIVE': {
      errorText = t('customerInactiveErrorText')
    }
    case 'EVENT_NO_TITLE': {
      errorText = t('eventNoTitleErrorText')
    }
  }

  const errorMessage: IUserMessageProps = errorText && {
    text: errorText,
    intent: 'error'
  }

  return { errorMessage }
}
