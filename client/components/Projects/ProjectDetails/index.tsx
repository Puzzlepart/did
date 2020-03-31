import { useMutation, useQuery } from '@apollo/react-hooks';
import { EventList } from 'components/Timesheet/EventList';
import { IBaseResult } from 'graphql';
import { getValueTyped as value } from 'helpers';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import * as excel from 'utils/exportExcel';
import { CREATE_OUTLOOK_CATEGORY } from './CREATE_OUTLOOK_CATEGORY';
import { GET_PROJECT_CONFIRMED_TIME_ENTRIES } from './GET_PROJECT_CONFIRMED_TIME_ENTRIES';
import { IProjectDetailsProps } from './IProjectDetailsProps';
import { IOutlookCategory } from 'interfaces';


export const ProjectDetails = (props: IProjectDetailsProps) => {
    const [project, setProject] = React.useState({ ...props.project });
    const { loading, error, data } = useQuery(GET_PROJECT_CONFIRMED_TIME_ENTRIES, { variables: { projectId: props.project.id } });
    const [createOutlookCategory] = useMutation<{ result: IBaseResult }, { category: IOutlookCategory }>(CREATE_OUTLOOK_CATEGORY);

    React.useEffect(() => setProject({ ...props.project }), [props.project]);

    const entries = value<any[]>(data, 'result.entries', []);

    /**
     * On export to Excel
     */
    async function onExportExcel() {
        let key = project.id.replace(/\s+/g, '-').toUpperCase();
        await excel.exportExcel(
            entries,
            {
                fileName: `ApprovedTimeEntries-${key}-${new Date().getTime()}.xlsx`,
                skip: ['id', '__typename'],
            });
    }

    /**
     * On create category in Outlook
     */
    async function onCreateCategory() {
        let color = 'preset' + Math.floor(Math.random() * Math.floor(25));
        const { data: { result } } = await createOutlookCategory({ variables: { category: { displayName: project.key.toString(), color } } });
        if (result.success) {
            setProject({ ...project, outlookCategory: JSON.parse(result.data) });
        }
    }

    return (
        <div className='c-ProjectDetails'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm'>
                        <h3>{project.name}</h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm'>
                        <p>{project.description}</p>
                    </div>
                </div>
                <div className='row' hidden={!project.outlookCategory}>
                    <div className='col-sm'>
                        <MessageBar messageBarIconProps={{ iconName: 'OutlookLogoInverse' }}>This project has a category in your Outlook.</MessageBar>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm'>
                        <DefaultButton
                            hidden={!project.webLink}
                            text='Project workspace'
                            onClick={() => window.location.replace(project.webLink)}
                            iconProps={{ iconName: 'WorkforceManagement' }}
                            disabled={loading || !!error || !project.webLink} />
                        <DefaultButton
                            hidden={entries.length === 0}
                            text='Export to Excel'
                            iconProps={{ iconName: 'ExcelDocument' }}
                            onClick={onExportExcel}
                            disabled={loading || !!error}
                            style={{ marginLeft: 5 }} />
                        <DefaultButton
                            hidden={!!project.outlookCategory}
                            text='Create category in Outlook'
                            iconProps={{ iconName: 'OutlookLogoInverse' }}
                            onClick={onCreateCategory}
                            disabled={loading}
                            style={{ marginLeft: 5 }} />
                    </div>
                </div>
                <div className='row' style={{ marginTop: 20 }}>
                    <div className='col-sm'>
                        {error && <MessageBar messageBarType={MessageBarType.error}>An error occured loading time entries for the project.</MessageBar>}
                        {(entries.length === 0 && !loading) && <MessageBar messageBarType={MessageBarType.info}>No time entries registered for the project.</MessageBar>}
                        {loading && <ProgressIndicator />}
                    </div>
                </div>
                <div className='col-sm'>
                    <div className='row'>
                        {entries.length > 0 && (
                            <EventList
                                events={entries}
                                hideColumns={['project', 'customer']}
                                dateFormat='MMM Do YYYY HH:mm'
                                columnWidths={{ time: 250 }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};