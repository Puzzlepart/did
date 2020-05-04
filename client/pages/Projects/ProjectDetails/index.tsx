import { useMutation, useQuery } from '@apollo/react-hooks';
import EventList from 'common/components/EventList';
import { UserMessage } from 'common/components/UserMessage';
import { IBaseResult } from 'graphql';
import resource from 'i18n';
import { IOutlookCategory } from 'interfaces';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import * as excel from 'utils/exportExcel';
import { generateColumn as col } from 'utils/generateColumn';
import { CREATE_OUTLOOK_CATEGORY } from './CREATE_OUTLOOK_CATEGORY';
import { IProjectDetailsProps } from './IProjectDetailsProps';
import PROJECT_TIME_ENTRIES from './PROJECT_TIME_ENTRIES';

/**
 * @category Projects
 */
export const ProjectDetails = (props: IProjectDetailsProps) => {
    const [project, setProject] = React.useState({ ...props.project });
    const { loading, error, data } = useQuery<{ timeentries: any[] }>(PROJECT_TIME_ENTRIES, { variables: { projectId: props.project.id } });
    const [createOutlookCategory] = useMutation<{ result: IBaseResult }, { category: IOutlookCategory }>(CREATE_OUTLOOK_CATEGORY);

    React.useEffect(() => setProject({ ...props.project }), [props.project]);

    const timeentries = data ? data.timeentries : [];

    /**
     * On export to Excel
     */
    async function onExportExcel() {
        const key = project.id.replace(/\s+/g, '-').toUpperCase();
        await excel.exportExcel(
            timeentries,
            {
                fileName: `ApprovedTimeEntries-${key}-${new Date().getTime()}.xlsx`,
                skip: ['id', '__typename'],
            });
    }

    /**
     * On create category in Outlook
     * 
     * @param {string} color Color for the category (randomized if not specified)
     */
    async function onCreateCategory(color = 'preset' + Math.floor(Math.random() * Math.floor(25))) {
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
                {project.inactive && (
                    <div className='row' style={{ marginBottom: 10 }}>
                        <div className='col-sm'>
                            <UserMessage text={resource('PROJECTS.PROJECT_INACTIVE_TEXT')} iconName='Warning' type={MessageBarType.warning} />
                        </div>
                    </div>
                )}
                <div className='row'>
                    <div className='col-sm'>
                        <p>{project.description}</p>
                    </div>
                </div>
                <div className='row' hidden={!project.outlookCategory}>
                    <div className='col-sm'>
                        <MessageBar messageBarIconProps={{ iconName: 'OutlookLogoInverse' }}>{resource('PROJECTS.CATEGORY_OUTLOOK_TEXT')}</MessageBar>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm'>
                        <DefaultButton
                            hidden={!project.webLink}
                            text={resource('PROJECTS.PROJECT_WORKSPACE_LABEL')}
                            onClick={() => window.location.replace(project.webLink)}
                            iconProps={{ iconName: 'WorkforceManagement' }}
                            disabled={loading || !!error || !project.webLink} />
                        <DefaultButton
                            hidden={timeentries.length === 0}
                            text={resource('COMMON.EXPORT_TO_EXCEL_LABEL')}
                            iconProps={{ iconName: 'ExcelDocument' }}
                            onClick={onExportExcel}
                            disabled={loading || !!error}
                            style={{ marginLeft: 5 }} />
                        <DefaultButton
                            hidden={!!project.outlookCategory}
                            text={resource('PROJECTS.CREATE_OUTLOOK_CATEGORY_LABEL')}
                            iconProps={{ iconName: 'OutlookLogoInverse' }}
                            onClick={() => onCreateCategory()}
                            disabled={loading}
                            style={{ marginLeft: 5 }} />
                    </div>
                </div>
                <div className='row' style={{ marginTop: 20 }}>
                    <div className='col-sm'>
                        {error && <UserMessage type={MessageBarType.error} text={resource('PROJECTS.TIME_ENTRIES_ERROR_TEXT')} />}
                        {(timeentries.length === 0 && !loading) && <UserMessage text={resource('PROJECTS.NO_TIME_ENTRIES_TEXT')} />}
                        {loading && <ProgressIndicator label={resource('PROJECTS.TIME_ENTRIES_LOADING_LABEL')} />}
                    </div>
                </div>
                <div className='col-sm'>
                    <div className='row'>
                        {timeentries.length > 0 && (
                            <EventList
                                events={timeentries}
                                additionalColumns={[col('resourceName', 'User')]}
                                dateFormat='MMM Do YYYY HH:mm'
                                columnWidths={{ time: 250 }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};