
import { UserMessage, SearchProject } from 'common/components';
import { getValueTyped as value } from 'helpers';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';
import { useState } from 'react';
import * as format from 'string-format';
import { IResolveProjectModalProps } from './types';
import resource from 'i18n';

 /**
  * Modal for resolving a project that hasn't been matched to a project
  * 
  * @category EventList
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
                text={format(resource('TIMESHEET.MATCH_OUTLOOK_NOTE'), event.webLink)} />

            <UserMessage
                hidden={!event.suggestedProject}
                style={{ marginTop: 5 }}
                iconName='Lightbulb' >
                <p>{resource('TIMESHEET.DID_YOU_MEAN_TEXT')}<a href="#" onClick={_ => onProjectSelected(event.suggestedProject)}>{value(event, 'suggestedProject.id', '')}</a>?</p>
            </UserMessage>

            <UserMessage
                hidden={!event.customer || !!event.suggestedProject}
                style={{ marginTop: 5 }}
                text={format(resource('TIMESHEET.EVENT_NOT_FULLY_MATCHED_TEXT'), value(event, 'customer.name', ''))} />

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
