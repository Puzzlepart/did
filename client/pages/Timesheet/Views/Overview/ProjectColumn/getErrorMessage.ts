import { AlertProps } from '@fluentui/react-components/dist/unstable'
import { TFunction } from 'i18next'

/**
 * Get error message for the event by error code. Translate function
 * from i18next is passed as a parameter due to the fact that this function
 * is called from the component and the hook can't be called inside the loop.
 *
 * @param code - Error code
 * @param t - Translate function
 */
export function getErrorMessage(
  code: string,
  t: TFunction
): [string, AlertProps['intent']] {
  switch (code) {
    case 'PROJECT_INACTIVE': {
      return [t('timesheet.projectInactiveErrorText'), 'error']
    }
    case 'CUSTOMER_INACTIVE': {
      return [t('timesheet.customerInactiveErrorText'), 'error']
    }
    case 'EVENT_NO_TITLE': {
      return [t('timesheet.eventNoTitleErrorText'), 'error']
    }
  }
}
