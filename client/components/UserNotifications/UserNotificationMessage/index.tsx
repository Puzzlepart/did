import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar'
import { Link } from 'office-ui-fabric-react/lib/Link'
import * as React from 'react'
import { IUserNotificationMessageProps } from './types'
import styles from './UserNotificationMessage.module.scss'
import { useTranslation } from 'react-i18next'

/**
 * @category UserNotifications
 */
export const UserNotificationMessage = ({ model, onDismiss }: IUserNotificationMessageProps) => {
    const { t } = useTranslation('common')
    return (
        <MessageBar
            {...model.messageBarProps}
            onDismiss={() => onDismiss(model)}
            className={styles.root}>
            <span>{model.text} </span>
            {model.moreLink && (
                <Link target='_blank' href={model.moreLink}>{t('moreLinkText')}</Link>
            )}
        </MessageBar>
    )
}