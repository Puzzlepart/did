import { SearchProject, UserMessage } from 'components'
import { get } from 'helpers'
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import { ITimesheetContext, TimesheetContext } from 'pages/Timesheet/context'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IProject } from 'types/IProject'
import styles from './MatchEventPanel.module.scss'
import { IMatchEventPanelProps } from './types'

export const MatchEventPanel = ({ event }: IMatchEventPanelProps) => {
    const { t } = useTranslation()
    const { dispatch } = useContext<ITimesheetContext>(TimesheetContext)
    const [isPanelVisible, setPanelVisibility] = useState(false)

    const hidePanel = () => setPanelVisibility(false)
    const showPanel = () => setPanelVisibility(true)

    /**
     * On manual match. Dispatches action type MANUAL_MATCH
     * 
     * @param {IProject} project Project to match the event to
     */
    const onManualMatch = (project: IProject) => {
        hidePanel()
        dispatch({ type: 'MANUAL_MATCH', payload: { eventId: event.id, project } })
    }

    return (
        <span className={styles.root}>
            <MessageBarButton
                text={t('timesheet.resolveProjectButtonLabel')}
                title={t('timesheet.resolveProjectButtonLabel')}
                iconProps={{ iconName: 'ReviewResponseSolid' }}
                onClick={showPanel} />
            <Panel
                isOpen={isPanelVisible}
                headerText={t('timesheet.matchEventPanelHeaderText')}
                onDismiss={hidePanel}>
                <div className={styles.subText}>{event.title}</div>
                <UserMessage iconName='OutlookLogo' text={t('timesheet.matchOutlookInfoText', event)} />
                <UserMessage
                    hidden={!event.suggestedProject}
                    containerStyle={{ marginTop: 10 }}
                    iconName='Lightbulb' >
                    <p>
                        <span>{t('timesheet.didYouMeanText')}</span>
                        <a href='#' onClick={() => onManualMatch(event.suggestedProject)}>
                            {get(event, 'suggestedProject.id', '')}
                        </a>?
                    </p>
                </UserMessage>
                <UserMessage
                    hidden={!event.customer || !!event.suggestedProject}
                    containerStyle={{ marginTop: 10 }}
                    text={t('timesheet.eventNotFullyMatchedText', { name: get(event, 'customer.name', '') })} />
                <SearchProject
                    width='100%'
                    className={styles.searchProject}
                    onSelected={project => onManualMatch(project)}
                    placeholder={t('common.searchPlaceholder')} />
            </Panel>
        </span>
    )
}
