
import { getId } from '@uifabric/utilities';
import { UserMessage } from 'components/UserMessage';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { useState } from 'react';
import { ResolveProjectModal } from './ResolveProjectModal';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { IProjectColumnProps } from './IProjectColumnProps';

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
            <div className='c-Timesheet-projectColumn'>
                <UserMessage
                    style={{ width: 260, marginTop: 10 }}
                    type={MessageBarType.warning}
                    iconName='TagUnknown'
                    actions={
                        <div>
                            <MessageBarButton onClick={_ => setModal(true)} id={toggleId}>Resolve</MessageBarButton>
                            <MessageBarButton onClick={onProjectIgnore}>Ignore</MessageBarButton>
                        </div>
                    }>Not matched</UserMessage>
                <ResolveProjectModal
                    event={event}
                    onDismiss={() => setModal(false)}
                    isOpen={modal}
                    onProjectSelected={project => {
                        setModal(false);
                        onProjectSelected(project);
                    }} />
            </div>
        );
    }


    return (
        <div className='c-Timesheet-projectColumn'>
            <div className='c-Timesheet-projectColumn-warning'>
                <TooltipHost
                    content='The project or customer is no longer valid.'
                    styles={{ root: { display: 'inline-block' } }}>
                    <Icon iconName='Warning' styles={{ root: { fontSize: 14, color: 'red' } }} />
                </TooltipHost>
            </div>
            <div className='c-Timesheet-projectColumn-content'>
                <div><a href={`/projects#${event.project.id}`}>{event.project.name}</a></div>
                <div style={{ fontSize: '7pt' }}>for <a style={{ fontSize: '7pt' }} href={`/customers#${event.customer.id}`}>{event.customer.name}</a></div>
            </div>
            <div className='c-Timesheet-projectColumn-clear' title='Clear' hidden={!event.isManualMatch}>
                <span onClick={onProjectClear} style={{ cursor: 'pointer' }}><Icon iconName='Cancel' styles={{ root: { fontSize: 14 } }} /></span>
            </div>
        </div>
    );
}
