import { useMutation, useQuery } from '@apollo/react-hooks'
import { EntityLabel } from 'components/EntityLabel'
import EventList from 'components/EventList'
import { UserMessage } from 'components/UserMessage'
import { IBaseResult } from 'graphql'
import { IOutlookCategory } from 'interfaces'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import * as excel from 'utils/exportExcel'
import { generateColumn as col } from 'utils/generateColumn'
import columns from './columns'
import { CREATE_OUTLOOK_CATEGORY } from './CREATE_OUTLOOK_CATEGORY'
import { IProjectDetailsProps } from './IProjectDetailsProps'
import styles from './ProjectDetails.module.scss'
import PROJECT_TIME_ENTRIES from './PROJECT_TIME_ENTRIES'
import { getTheme } from 'office-ui-fabric-react/lib/Styling'

/**
 * @category Projects
 */
export const ProjectDetails = (props: IProjectDetailsProps) => {
    const theme = getTheme()
    const { t } = useTranslation(['projects', 'common'])
    const [project, setProject] = React.useState({ ...props.project })
    const { loading, error, data } = useQuery<{ timeentries: any[] }>(PROJECT_TIME_ENTRIES, { variables: { projectId: props.project.id } })
    const [createOutlookCategory] = useMutation<{ result: IBaseResult }, { category: IOutlookCategory }>(CREATE_OUTLOOK_CATEGORY)

    React.useEffect(() => setProject({ ...props.project }), [props.project])

    const timeentries = data ? data.timeentries : []

    async function onExportExcel() {
        const key = project.id.replace(/\s+/g, '-').toUpperCase()
        await excel.exportExcel(
            timeentries,
            {

                columns: columns(t),
                fileName: `TimeEntries-${key}-${new Date().toDateString().split(' ').join('-')}.xlsx`,
            })
    }

    /**
     * On create category in Outlook
     * 
     * @param {string} color Color for the category (randomized if not specified)
     */
    async function onCreateCategory(color: string = 'preset' + Math.floor(Math.random() * Math.floor(25))) {
        const { data: { result } } = await createOutlookCategory({ variables: { category: { displayName: project.key.toString(), color } } })
        if (result.success) {
            setProject({ ...project, outlookCategory: JSON.parse(result.data) })
        }
    }

    return (
        <div className={styles.root}>
            <h3 className={styles.name}>{project.name}</h3>
            <h5 className={styles.customer}>{project.customer.name}</h5>
            {project.inactive && (
                <UserMessage
                    text={t('inactiveText')}
                    iconName='Warning'
                    type={MessageBarType.warning} />
            )}
            <div className={styles.description}>{project.description}</div>
            <div className={styles.description}>
                {project.labels.map((label, idx) => (
                    <EntityLabel
                        key={idx}
                        label={label}
                        size='small' />
                ))}
            </div>
            <div hidden={!project.outlookCategory}>
                <MessageBar messageBarIconProps={{ iconName: 'OutlookLogoInverse' }}>{t('categoryOutlookText')}</MessageBar>
            </div>
            <div className={styles.actions}>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !!error || !project.webLink}>
                    <DefaultButton
                        text={t('workspaceLabel')}
                        onClick={() => window.location.replace(project.webLink)}
                        iconProps={{ iconName: 'WorkforceManagement' }} />
                </div>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !!error || timeentries.length === 0}>
                    <DefaultButton
                        text={t('exportTimeEntriesLabel')}
                        iconProps={{ iconName: 'ExcelDocument' }}
                        onClick={onExportExcel} />
                </div>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !!project.outlookCategory}>
                    <DefaultButton
                        text={t('createOutlookCategoryLabel')}
                        iconProps={{ iconName: 'OutlookLogoInverse' }}
                        onClick={() => onCreateCategory()} />
                </div>
            </div>
            <div>
                {error && <UserMessage type={MessageBarType.error} text={t('timeEntriesErrorText')} />}
                {(timeentries.length === 0 && !loading) && <UserMessage text={t('noTimeEntriesText')} />}
                {loading && <ProgressIndicator label={t('timeEntriesLoadingLabel')} />}
            </div>
            <div>
                {timeentries.length > 0 && (
                    <EventList
                        events={timeentries}
                        additionalColumns={[col('resourceName', t('employeeLabel', { ns: 'common' }))]}
                        dateFormat='MMM Do YYYY HH:mm'
                        columnWidths={{ time: 250 }} />
                )}
            </div>
        </div >
    )
}