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
import columns from './columns';
import { CREATE_OUTLOOK_CATEGORY } from './CREATE_OUTLOOK_CATEGORY';
import { IProjectDetailsProps } from './IProjectDetailsProps';
import styles from './ProjectDetails.module.scss';
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

    async function onExportExcel() {
        const key = project.id.replace(/\s+/g, '-').toUpperCase();
        await excel.exportExcel(
            timeentries,
            {

                columns: columns(resource),
                fileName: `TimeEntries-${key}-${new Date().toDateString().split(' ').join('-')}.xlsx`,
            });
    }

    /**
     * On create category in Outlook
     * 
     * @param {string} color Color for the category (randomized if not specified)
     */
    async function onCreateCategory(color: string = 'preset' + Math.floor(Math.random() * Math.floor(25))) {
        const { data: { result } } = await createOutlookCategory({ variables: { category: { displayName: project.key.toString(), color } } });
        if (result.success) {
            setProject({ ...project, outlookCategory: JSON.parse(result.data) });
        }
    }

    return (
        <div className={styles.root}>
            <h3 className={styles.name}>{project.name}</h3>
            <h5 className={styles.customer}>{project.customer.name}</h5>
            {project.inactive && (
                <UserMessage
                    text={resource('PROJECTS.PROJECT_INACTIVE_TEXT')}
                    iconName='Warning'
                    type={MessageBarType.warning} />
            )}
            <div className={styles.description}>{project.description}</div>
            <div hidden={!project.outlookCategory}>
                <MessageBar messageBarIconProps={{ iconName: 'OutlookLogoInverse' }}>{resource('PROJECTS.CATEGORY_OUTLOOK_TEXT')}</MessageBar>
            </div>
            <div className={styles.actions}>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !!error || !project.webLink}>
                    <DefaultButton
                        text={resource('PROJECTS.PROJECT_WORKSPACE_LABEL')}
                        onClick={() => window.location.replace(project.webLink)}
                        iconProps={{ iconName: 'WorkforceManagement' }} />
                </div>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !!error || timeentries.length === 0}>
                    <DefaultButton
                        text={resource('PROJECTS.EXPORT_TIME_ENTIRES_TO_EXCEL_LABEL')}
                        iconProps={{ iconName: 'ExcelDocument' }}
                        onClick={onExportExcel} />
                </div>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !!project.outlookCategory}>
                    <DefaultButton
                        text={resource('PROJECTS.CREATE_OUTLOOK_CATEGORY_LABEL')}
                        iconProps={{ iconName: 'OutlookLogoInverse' }}
                        onClick={() => onCreateCategory()} />
                </div>
            </div>
            <div>
                {error && <UserMessage type={MessageBarType.error} text={resource('PROJECTS.TIME_ENTRIES_ERROR_TEXT')} />}
                {(timeentries.length === 0 && !loading) && <UserMessage text={resource('PROJECTS.NO_TIME_ENTRIES_TEXT')} />}
                {loading && <ProgressIndicator label={resource('PROJECTS.TIME_ENTRIES_LOADING_LABEL')} />}
            </div>
            <div>
                {timeentries.length > 0 && (
                    <EventList
                        events={timeentries}
                        additionalColumns={[col('resourceName', resource('COMMON.EMPLOYEE_LABEL'))]}
                        dateFormat='MMM Do YYYY HH:mm'
                        columnWidths={{ time: 250 }} />
                )}
            </div>
        </div >
    );
};