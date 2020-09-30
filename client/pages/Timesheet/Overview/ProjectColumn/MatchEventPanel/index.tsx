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
    const [showPanel, setShowPanel] = useState<boolean>(false)

    const onResolve = (project: IProject) => {
        setShowPanel(false)
        dispatch({ type: 'MANUAL_MATCH', payload: { eventId: event.id, project } })
    }

    return (
        <>
            <BrowserView renderWithFragment={true}>
                <MessageBarButton
                    text={t('timesheet.resolveProjectButtonLabel')}
                    iconProps={{ iconName: 'ReviewResponseSolid' }}
                    onClick={() => setShowPanel(true)} />
            </BrowserView>
            <MobileView renderWithFragment={true}>
                <Icon
                    styles={{ root: { fontSize: 18 } }}
                    iconName='ReviewResponseSolid'
                    onClick={() => setShowPanel(true)} />
            </MobileView>
            <Panel
                className={styles.root}
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}>
                <div className={styles.title}>{event.title}</div>
                <UserMessage
                    iconName='OutlookLogo'
                    text={t('timesheet.matchOutlookInfoText', event)} />

                <UserMessage
                    hidden={!event.suggestedProject}
                    containerStyle={{ marginTop: 10 }}
                    iconName='Lightbulb' >
                    <p>
                        <span>{t('timesheet.didYouMeanText')}</span>
                        <a href='#' onClick={() => onResolve(event.suggestedProject)}>
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
                    onSelected={project => onResolve(project)}
                    placeholder={t('common.searchPlaceholder')} />
            </Panel>
        </>
    )
}
