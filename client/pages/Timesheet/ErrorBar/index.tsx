import { IUserMessageProps, UserMessage } from 'components/UserMessage'
import get from 'get-value'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ErrorBar.module.scss'
import { IErrorBarProps } from './types'

/**
 * @category Timesheet
 */
export const ErrorBar: FC<IErrorBarProps> = ({ error }) => {
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
    <div className={styles.root}>
      <UserMessage {...messageProps} />
    </div>
  )
}
