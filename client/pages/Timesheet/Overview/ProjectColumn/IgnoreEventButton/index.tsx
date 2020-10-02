import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { IIgnoreEventButtonProps } from '../types'
import { TimesheetContext } from '../../../types'
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { MobileView, BrowserView } from 'react-device-detect'
import styles from './IgnoreEventButton.module.scss'

/**
 * @category Timesheet
 */
export const IgnoreEventButton = ({ event }: IIgnoreEventButtonProps): JSX.Element => {
    const { t } = useTranslation()
    const { dispatch } = useContext(TimesheetContext)
    return (
        <span className={styles.root} onClick={() => dispatch({ type: 'IGNORE_EVENT', payload: event.id })}>
            <BrowserView renderWithFragment={true}>
                <MessageBarButton text={t('timesheet.ignoreEventButtonLabel')} iconProps={{ iconName: 'Blocked2' }} />
            </BrowserView>
            <MobileView renderWithFragment={true}>
                <Icon className={styles.icon} iconName='Blocked2' />
                <span className={styles.text}>{t('timesheet.ignoreEventButtonLabel')}</span>
            </MobileView>
        </span>
    )
}
