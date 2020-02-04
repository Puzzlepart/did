
import { TypedHash } from '@pnp/common';
import { getId } from '@uifabric/utilities';
import { UserMessage } from 'components/UserMessage';
import { getValueTyped as value } from 'helpers';
import { ITimeEntry, IProject } from 'models';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';
import { useState } from 'react';
import { SearchProject } from './SearchProject';

const SUGGESTED_PROJECT_MSG_ID = getId('suggested-project-msg');
const CUSTOMER_MATCH_MSG_ID = getId('customer-match-msg');
const INFO_MSG_ID = getId('info-msg');

interface IResolveProjectModalProps {
    event: ITimeEntry;
    isOpen?: boolean;
    onDismiss?: () => void;
    onProjectSelected?: (project: IProject) => void;
}

/**
 * @component ResolveProjectModal
 * @description @todo
 */
export const ResolveProjectModal = ({ isOpen, onDismiss, onProjectSelected, event }: IResolveProjectModalProps) => {
    const [dismissed, dismiss] = useState<TypedHash<boolean>>({});
    const [scope, setScope] = useState<boolean>(!!event.customer);

    /**
     * Dismiss message
     * 
     * @param {string} id Id of the message
     */
    const dismissMessage = (id: string) => {
        dismiss({ ...dismissed, [id]: true });
    }

    return (
        <Modal
            containerClassName='c-resolveproject-modal'
            isOpen={isOpen}
            onDismiss={onDismiss}>
            <UserMessage
                id={INFO_MSG_ID}
                hidden={!event.suggestedProject || dismissed[INFO_MSG_ID]}
                iconName='Message'
                onDismiss={() => dismissMessage(INFO_MSG_ID)}
                text='You should try your best to match the events in Outlook, but in some cases it might be neccessary to manually match.' />

            <UserMessage
                id={SUGGESTED_PROJECT_MSG_ID}
                hidden={!event.suggestedProject || dismissed[SUGGESTED_PROJECT_MSG_ID]}
                style={{ marginTop: 5 }}
                iconName='Lightbulb'
                onDismiss={() => dismissMessage(SUGGESTED_PROJECT_MSG_ID)} >
                <p>Did you mean<a href="#" onClick={_ => onProjectSelected(event.suggestedProject)}>{value(event, 'suggestedProject.id', '')}</a>?</p>
            </UserMessage>

            <UserMessage
                id={CUSTOMER_MATCH_MSG_ID}
                hidden={!event.customer || dismissed[CUSTOMER_MATCH_MSG_ID] || !!event.suggestedProject}
                style={{ marginTop: 5 }}
                text={`Event not matched. We found a matching customer \`${value(event, 'customer.name', '')}\`, but not a project with key \`${event.projectKey}\`.`}
                onDismiss={() => dismissMessage(CUSTOMER_MATCH_MSG_ID)} />

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
                <PivotItem
                    itemKey='suggestions'
                    headerText='Suggestions'
                    itemIcon='Lightbulb'
                    style={{ paddingTop: 10 }}>
                    <UserMessage text='Suggestions will come up here.' />
                </PivotItem>
            </Pivot>
        </Modal >
    );
}
