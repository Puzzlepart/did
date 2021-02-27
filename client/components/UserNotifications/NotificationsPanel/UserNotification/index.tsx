import { Link, MessageBar } from 'office-ui-fabric'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { IUserNotificationProps } from './types'
import styles from './UserNotificationMessage.module.scss'

export const UserNotification = ({
  model,
  onDismiss
}: IUserNotificationProps) => {
  const { t } = useTranslation()
  return (
    <MessageBar
      {...model.messageProps}
      onDismiss={() => onDismiss(model)}
      className={styles.root}
      styles={{ actions: { flexDirection: 'row', paddingLeft: 28 } }}
      actions={(
        <Link href={model.moreLink}>{model.getMoreLinkText(t)}</Link>
      )}>
      <span className={styles.text}>{model.text}</span>
    </MessageBar>
  )
}
