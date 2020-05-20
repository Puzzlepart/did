import { SearchProject, UserMessage } from 'components'
import { value as value } from 'helpers'
import { IProject } from 'interfaces/IProject'
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { ITimesheetContext, TimesheetContext } from 'pages/Timesheet/TimesheetContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import format from 'string-format'
import styles from './ResolveProjectModal.module.scss'
import { IResolveProjectModalProps } from './types'

/**
 * @category Timesheet
*/
export const ResolveProjectModal = ({ event }: IResolveProjectModalProps) => {
    const { t } = useTranslation(['timesheet', 'common'])
    const { dispatch } = React.useContext<ITimesheetContext>(TimesheetContext)
    const [showResolveModal, setShowResolveModal] = React.useState<boolean>(false)

    const onResolve = (project: IProject) => {
        setShowResolveModal(false)
        dispatch({ type: 'MANUAL_MATCH', payload: { eventId: event.id, project } })
    }

    return (
        <>
            <MessageBarButton
                text={t('resolveProjectButtonLabel')}
                iconProps={{ iconName: 'ReviewResponseSolid' }}
                onClick={() => setShowResolveModal(true)} />
            <Modal
                containerClassName={styles.root}
                isOpen={showResolveModal}
                onDismiss={() => setShowResolveModal(false)}>
                <div className={styles.title}>{event.title}</div>
                <UserMessage
                    iconName='OutlookLogo'
                    text={format(t('matchOutlookInfoText'), event.webLink)} />

                <UserMessage
                    hidden={!event.suggestedProject}
                    containerStyle={{ marginTop: 10 }}
                    iconName='Lightbulb' >
                    <p>
                        <span>{t('didYouMeanText')}</span>
                        <a href='#' onClick={() => onResolve(event.suggestedProject)}>
                            {value(event, 'suggestedProject.id', '')}
                        </a>?
                    </p>
                </UserMessage>

                <UserMessage
                    hidden={!event.customer || !!event.suggestedProject}
                    containerStyle={{ marginTop: 10 }}
                    text={format(t('eventNotFullyMatchedText'), value(event, 'customer.name', ''))} />
                <SearchProject
                    width={450}
                    className={styles.searchProject}
                    onSelected={project => onResolve(project)}
                    placeholder={t('searchPlaceholder', { ns: 'common' })} />
            </Modal>
        </>
    )
}
