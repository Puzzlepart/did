import { IUserMessageProps, UserMessage } from 'components/UserMessage'
import get from 'get-value'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './ErrorBar.module.scss'
import { IErrorBarProps } from './types'

/**
 * @category Timesheet
 */
export const ErrorBar: StyledComponent<IErrorBarProps> = ({ error }) => {
  const { t } = useTranslation()
  if (!error) return null
  let messageProps: IUserMessageProps
  const code = get(error, 'graphQLErrors.0.extensions.code', { default: '' })
  switch (code) {
    case 'ResourceNotFound': {
      {
        messageProps = {
          text: t('timesheet.exchangeLicenseErrorMessageText'),
          intent: 'error'
        }
      }
      break
    }
    default: {
      messageProps = {
        text: t('timesheet.errorMessageText'),
        intent: 'error'
      }
    }
  }
  return (
    <div className={ErrorBar.className}>
      <UserMessage {...messageProps} />
    </div>
  )
}

ErrorBar.displayName = 'Timesheet.ErrorBar'
ErrorBar.className = styles.errorBar
