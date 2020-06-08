import { useQuery } from '@apollo/react-hooks'
import EventList from 'components/EventList'
import { UserMessage } from 'components/UserMessage'
import { IProject } from 'interfaces'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import * as excel from 'utils/exportExcel'
import { generateColumn as col } from 'utils/generateColumn'
import columns from './columns'
import PROJECT_TIME_ENTRIES from './PROJECT_TIME_ENTRIES'
import styles from './TimeEntries.module.scss'

export interface ITimeEntriesProps {
    project: IProject;
}

/**
 * @category Projects
 */
export const TimeEntries = (props: ITimeEntriesProps) => {
    const { t } = useTranslation(['projects', 'common'])
    const { loading, error, data } = useQuery<{ timeentries: any[] }>(PROJECT_TIME_ENTRIES, { variables: { projectId: props.project.id } })

    const timeentries = data ? data.timeentries : []

    async function onExportExcel() {
        const key = props.project.id.replace(/\s+/g, '-').toUpperCase()
        await excel.exportExcel(
            timeentries,
            {

                columns: columns(t),
                fileName: `TimeEntries-${key}-${new Date().toDateString().split(' ').join('-')}.xlsx`,
            })
    }

    return (
        <div className={styles.root}>
            <h4 className={styles.title}>Timeoppføringer</h4>
            <div className={styles.actions}>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !!error || timeentries.length === 0}>
                    <DefaultButton
                        text={t('exportCurrentView', { ns: 'common' })}
                        iconProps={{ iconName: 'ExcelDocument' }}
                        onClick={onExportExcel} />
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
        </div>
    )
}