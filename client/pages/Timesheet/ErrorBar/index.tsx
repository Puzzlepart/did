import { IUserMessageProps, UserMessage } from 'components/UserMessage'
import { MessageBarType } from 'office-ui-fabric-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ErrorBar.module.scss'
import { IErrorBarProps } from './types'

export const ErrorBar = ({ error }: IErrorBarProps) => {
  const { t } = useTranslation()
  if (!error) return null
  let messageProps: IUserMessageProps
  const code = error.graphQLErrors[0]?.extensions?.code
  switch (code) {
    case 'ResourceNotFound':
      {
        messageProps = {
          text: t('timesheet.exchangeLicenseErrorMessageText'),
          type: MessageBarType.error,
          iconName: 'SearchCalendar'
        }
      }
      break
    default: {
      messageProps = {
        text: t('timesheet.errorMessageText'),
        type: MessageBarType.error
      }
    }
  }
  return (
    <div className={styles.root}>
      <UserMessage {...messageProps} />
    </div>
  )
}
