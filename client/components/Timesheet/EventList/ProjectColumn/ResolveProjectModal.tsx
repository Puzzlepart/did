
import { TypedHash } from '@pnp/common';
import { getId } from '@uifabric/utilities';
import { UserMessage } from 'components/UserMessage';
import { getValueTyped as value } from 'helpers';
import { ITimeEntry, IProject } from 'interfaces';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';
import { useState } from 'react';
import { SearchProject } from './SearchProject';

interface IResolveProjectModalProps {
    event: ITimeEntry;
    isOpen?: boolean;
    onDismiss?: () => void;
    onProjectSelected?: (project: IProject) => void;
}

/**
 * @component ResolveProjectModal
 * @description Modal for resolving a project that hasn't been matched to a project
 */
export const ResolveProjectModal = ({ isOpen, onDismiss, onProjectSelected, event }: IResolveProjectModalProps) => {
    const [scope, setScope] = useState<boolean>(!!event.customer);
    return (
        <Modal
            containerClassName='c-ResolveProjectModal'
            isOpen={isOpen}
            onDismiss={onDismiss}>
            <div className='c-ResolveProjectModal-title'>{event.title}</div>
            <UserMessage
                iconName='OutlookLogo'
                text={`**Please note:** You should try your best to match<a href='${event.webLink}' target='_blank'>the event in Outlook</a>, but in some cases it might be neccessary to manually match.`} />

            <UserMessage
                hidden={!event.suggestedProject}
                style={{ marginTop: 5 }}
                iconName='Lightbulb' >
                <p>Did you mean<a href="#" onClick={_ => onProjectSelected(event.suggestedProject)}>{value(event, 'suggestedProject.id', '')}</a>?</p>
            </UserMessage>

            <UserMessage
                hidden={!event.customer || !!event.suggestedProject}
                style={{ marginTop: 5 }}
                text={`Event not matched. We found a matching customer \`${value(event, 'customer.name', '')}\`, but not a project with the specified key.`} />

            <Pivot defaultSelectedKey='search-project' styles={{ root: { marginTop: 10 } }}>
                <PivotItem
                    itemKey='search-project'
                    headerText='Search'
                    itemIcon='Search'
                    style={{ paddingTop: 10 }}>
                    {event.customer && (
                        <Toggle
                            styles={{
                                root: { margin: '0 0 8px 0' },
                                text: { fontSize: 12, color: 'rgb(120, 120, 120)' },
                                label: { fontSize: 12, color: 'rgb(120, 120, 120)' },
                            }}
                            defaultChecked={scope}
                            onChange={(_event, scope) => setScope(scope)}
                            offText='All'
                            onText={event.customer.name}
                            label='Customer:'
                            inlineLabel={true} />
                    )}
                    <SearchProject
                        onSelected={onProjectSelected}
                        customer={scope && event.customer}
                        placeholder='Search in projects..' />
                </PivotItem>
            </Pivot>
        </Modal >
    );
}
