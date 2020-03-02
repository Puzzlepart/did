import { useQuery } from '@apollo/react-hooks';
import { EventList } from 'components/Timesheet/EventList';
import { currencyDisplay, getValueTyped as value } from 'helpers';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import * as excel from 'utils/exportExcel';
import { GET_PROJECT_CONFIRMED_TIME_ENTRIES } from './GET_PROJECT_CONFIRMED_TIME_ENTRIES';
import { IProjectDetailsProps } from './IProjectDetailsProps';
import { Label } from 'components/Label';


export const ProjectDetails = ({ project }: IProjectDetailsProps) => {
    const { loading, error, data } = useQuery(GET_PROJECT_CONFIRMED_TIME_ENTRIES, { variables: { projectId: project.id } });

    /** Initializing constants dependent on data from useQuery  */
    const entries = value<any[]>(data, 'result.entries', []);

    const onExport = async () => {
        let key = project.id.replace(/\s+/g, '-').toUpperCase();
        await excel.exportExcel(
            entries,
            {
                fileName: `ApprovedTimeEntries-${key}-${new Date().getTime()}.xlsx`,
                skip: ['id', '__typename'],
            });
    }

    return (
        <div className='c-ProjectDetails'>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h3>{project.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <p>{project.description}</p>
                    </div>
                </div>
                <div className="row c-ProjectDetails-labels">
                    <div className="col-sm">
                        {project.labels.map(label => <Label {...label} />)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <DefaultButton
                            hidden={!project.webLink}
                            text='Project workspace'
                            onClick={() => window.location.replace(project.webLink)}
                            iconProps={{ iconName: 'WorkforceManagement' }}
                            disabled={loading || !!error || !project.webLink} />
                        <DefaultButton
                            text='Export to Excel'
                            iconProps={{ iconName: 'ExcelDocument' }}
                            onClick={onExport}
                            disabled={loading || !!error || entries.length === 0}
                            style={{ marginLeft: 5 }} />
                    </div>
                </div>
            </div>
            {error && <MessageBar messageBarType={MessageBarType.error}>An error occured.</MessageBar>}
            {!error && (
                <EventList
                    enableShimmer={loading}
                    events={entries}
                    hideColumns={['project', 'customer']}
                    dateFormat='MMM Do YYYY HH:mm'
                    columnWidths={{ time: 250 }} />
            )}
        </div>
    );
};