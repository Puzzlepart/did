import { SearchProject, UserMessage } from 'components';
import { getValueTyped as value } from 'helpers';
import resource from 'i18n';
import { IProject } from 'interfaces/IProject';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { ITimesheetContext, TimesheetContext } from 'pages/Timesheet/TimesheetContext';
import React from 'react';
import format from 'string-format';
import styles from './ResolveProjectModal.module.scss';
import { IResolveProjectModalProps } from './types';

/**
 * @category Timesheet
*/
export const ResolveProjectModal = ({ event }: IResolveProjectModalProps) => {
    const { dispatch } = React.useContext<ITimesheetContext>(TimesheetContext);
    const [showResolveModal, setShowResolveModal] = React.useState<boolean>(false);

    const onResolve = (project: IProject) => {
        setShowResolveModal(false);
        dispatch({ type: 'MANUAL_MATCH', payload: { eventId: event.id, project } });
    };

    return (
        <>
            <MessageBarButton
                text={resource('TIMESHEET.RESOLVE_PROJECT_BUTTON_LABEL')}
                iconProps={{ iconName: 'ReviewResponseSolid' }}
                onClick={() => setShowResolveModal(true)} />
            <Modal
                containerClassName={styles.root}
                isOpen={showResolveModal}
                onDismiss={() => setShowResolveModal(false)}>
                <div className={styles.title}>{event.title}</div>
                <UserMessage
                    iconName='OutlookLogo'
                    text={format(resource('TIMESHEET.MATCH_OUTLOOK_NOTE'), event.webLink)} />

                <UserMessage
                    hidden={!event.suggestedProject}
                    containerStyle={{ marginTop: 10 }}
                    iconName='Lightbulb' >
                    <p>
                        <span>{resource('TIMESHEET.DID_YOU_MEAN_TEXT')}</span>
                        <a href='#' onClick={() => onResolve(event.suggestedProject)}>
                            {value(event, 'suggestedProject.id', '')}
                        </a>?
                    </p>
                </UserMessage>

                <UserMessage
                    hidden={!event.customer || !!event.suggestedProject}
                    containerStyle={{ marginTop: 10 }}
                    text={format(resource('TIMESHEET.EVENT_NOT_FULLY_MATCHED_TEXT'), value(event, 'customer.name', ''))} />
                <SearchProject
                    width={450}
                    className={styles.searchProject}
                    onSelected={project => onResolve(project)}
                    placeholder={resource('PROJECTS.SEARCH_PLACEHOLDER')} />
            </Modal>
        </>
    );
}
