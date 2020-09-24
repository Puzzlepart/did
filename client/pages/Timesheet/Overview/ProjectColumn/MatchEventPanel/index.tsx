import { SearchProject, UserMessage } from 'components'
import { value as value } from 'helpers'
import { IProject } from 'interfaces/IProject'
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import { ITimesheetContext, TimesheetContext } from 'pages/Timesheet/TimesheetContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import styles from './MatchEventPanel.module.scss'
import { IMatchEventPanelProps } from './types'
import { MobileView, BrowserView } from 'react-device-detect'

/**
 * @category Timesheet
*/
export const MatchEventPanel = ({ event }: IMatchEventPanelProps) => {
    const { t } = useTranslation()
    const { dispatch } = React.useContext<ITimesheetContext>(TimesheetContext)
    const [showPanel, setShowPanel] = React.useState<boolean>(false)

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
                    text={format(t('timesheet.matchOutlookInfoText'), event.webLink)} />

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
                    text={format(t('timesheet.eventNotFullyMatchedText'), value(event, 'customer.name', ''))} />

                <SearchProject
                    width='100%'
                    className={styles.searchProject}
                    onSelected={project => onResolve(project)}
                    placeholder={t('common.searchPlaceholder')} />
            </Panel>
        </>
    )
}
