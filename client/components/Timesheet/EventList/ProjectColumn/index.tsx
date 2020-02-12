
import { getId } from '@uifabric/utilities';
import { UserMessage } from 'components/UserMessage';
import { IProject, ITimeEntry } from 'models';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { useState } from 'react';
import { ResolveProjectModal } from './ResolveProjectModal';

interface IProjectColumnProps {
    event: ITimeEntry;
    isConfirmed?: boolean;
    onProjectSelected?: (project: IProject) => void;
    onProjectClear?: (evt: React.MouseEvent<any>) => void;
    onProjectIgnore?: (evt: React.MouseEvent<any>) => void;
}

/**
 * @component ProjectColumn
 * @description 
 */
export const ProjectColumn = ({ event, isConfirmed, onProjectSelected, onProjectClear, onProjectIgnore }: IProjectColumnProps) => {
    let toggleId = getId('toggle-callout');
    const [modal, setModal] = useState<boolean>(false);

    if (!event.project) {
        if (isConfirmed) return null;
        return (
            <>
                <UserMessage
                    style={{ width: 260 }}
                    type={MessageBarType.info}
                    iconName='SearchIssue'>
                    <p>
                        Not matched - <a href="#" onClick={_ => setModal(true)} id={toggleId}>Resolve</a> or<a href="#" style={{ color: 'rgb(220, 0, 78)' }} onClick={onProjectIgnore}>ignore</a>
                    </p>
                </UserMessage>
                <ResolveProjectModal
                    event={event}
                    onDismiss={() => setModal(false)}
                    isOpen={modal}
                    onProjectSelected={project => {
                        setModal(false);
                        onProjectSelected(project);
                    }} />
            </>
        );
    }
    return (
        <>
            <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                <div><a href={`/projects#${event.project.id}`}>{event.project.name}</a></div>
                <div style={{ fontSize: '7pt' }}>for <a style={{ fontSize: '7pt' }} href={`/customers#${event.customer.id}`}>{event.customer.name}</a></div>
            </div>
            <div style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: 4 }} title='Clear' hidden={!event.isManualMatch}>
                <span onClick={onProjectClear} style={{ cursor: 'pointer' }}><Icon iconName='Cancel' styles={{ root: { fontSize: 14 } }} /></span>
            </div>
        </>
    );
}
