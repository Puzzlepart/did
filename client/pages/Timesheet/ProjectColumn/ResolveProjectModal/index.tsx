import { SearchProject, UserMessage } from 'components';
import { getValueTyped as value } from 'helpers';
import resource from 'i18n';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import * as React from 'react';
import { useState } from 'react';
import * as format from 'string-format';
import styles from './ResolveProjectModal.module.scss';
import { IResolveProjectModalProps } from './types';

/**
 * @category Timesheet
*/
export const ResolveProjectModal = ({ isOpen, onDismiss, onProjectSelected, event }: IResolveProjectModalProps) => {
    const [scope, setScope] = useState<boolean>(!!event.customer);

    return (
        <Modal
            containerClassName={styles.root}
            isOpen={isOpen}
            onDismiss={onDismiss}>
            <div className={styles.title}>{event.title}</div>
            <UserMessage
                iconName='OutlookLogo'
                text={format(resource('TIMESHEET.MATCH_OUTLOOK_NOTE'), event.webLink)} />

            <UserMessage
                hidden={!event.suggestedProject}
                style={{ marginTop: 5 }}
                iconName='Lightbulb' >
                <p>{resource('TIMESHEET.DID_YOU_MEAN_TEXT')}<a href='#' onClick={() => onProjectSelected(event.suggestedProject)}>{value(event, 'suggestedProject.id', '')}</a>?</p>
            </UserMessage>

            <UserMessage
                hidden={!event.customer || !!event.suggestedProject}
                style={{ marginTop: 5 }}
                text={format(resource('TIMESHEET.EVENT_NOT_FULLY_MATCHED_TEXT'), value(event, 'customer.name', ''))} />

            <SearchProject
                className={styles.searchProject}
                onSelected={onProjectSelected}
                customer={scope && event.customer}
                placeholder={resource('PROJECTS.SEARCH_PLACEHOLDER')} />
        </Modal >
    );
}
