import { SearchProject, UserMessage } from 'components'
import { value } from 'helpers'
import { IProject } from 'interfaces/IProject'
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import { ITimesheetContext, TimesheetContext } from 'pages/Timesheet/context'
import React, { useContext, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import styles from './MatchEventPanel.module.scss'
import { IMatchEventPanelProps } from './types'

/**
 * @category Timesheet
*/
export const MatchEventPanel = ({ event }: IMatchEventPanelProps) => {
    const { t } = useTranslation()
    const { dispatch } = useContext<ITimesheetContext>(TimesheetContext)
    const [showPanel, setShowPanel] = useState(false)

    /**
     * On manual match. Dispatches action type MANUAL_MATCH
     * 
     * @param {IProject} project Project to match the event to
     */
    const onManualMatch = (project: IProject) => {
        setShowPanel(false)
        dispatch({ type: 'MANUAL_MATCH', payload: { eventId: event.id, project } })
    }

    return (
        <span className={styles.root}>
            <span className={styles.togglePanel}>
                <BrowserView renderWithFragment={true}>
                    <MessageBarButton
                        text={t('timesheet.resolveProjectButtonLabel')}
                        title={t('timesheet.resolveProjectButtonLabel')}
                        iconProps={{ iconName: 'ReviewResponseSolid' }}
                        onClick={() => setShowPanel(true)} />
                </BrowserView>
                <MobileView renderWithFragment={true}>
                    <Icon
                        className={styles.icon}
                        iconName='ReviewResponseSolid'
                        onClick={() => setShowPanel(true)} />
                    <span className={styles.text}>{t('timesheet.resolveProjectButtonLabel')}</span>
                </MobileView>
            </span>
            <Panel
                isOpen={showPanel}
                headerText={t('timesheet.matchEventPanelHeaderText')}
                onDismiss={() => setShowPanel(false)}>
                <div className={styles.subText}>{event.title}</div>
                <UserMessage
                    iconName='OutlookLogo'
                    text={t('timesheet.matchOutlookInfoText', event)} />

                <UserMessage
                    hidden={!event.suggestedProject}
                    containerStyle={{ marginTop: 10 }}
                    iconName='Lightbulb' >
                    <p>
                        <span>{t('timesheet.didYouMeanText')}</span>
                        <a href='#' onClick={() => onManualMatch(event.suggestedProject)}>
                            {value(event, 'suggestedProject.id', '')}
                        </a>?
                    </p>
                </UserMessage>

                <UserMessage
                    hidden={!event.customer || !!event.suggestedProject}
                    containerStyle={{ marginTop: 10 }}
                    text={t('timesheet.eventNotFullyMatchedText', { name: value(event, 'customer.name', '') })} />

                <SearchProject
                    width='100%'
                    className={styles.searchProject}
                    onSelected={project => onManualMatch(project)}
                    placeholder={t('common.searchPlaceholder')} />
            </Panel>
        </span>
    )
}
