import { useQuery } from '@apollo/react-hooks'
import { BaseFilter, FilterPanel, IFilter, MonthFilter, ResourceFilter, UserMessage, WeekFilter, YearFilter } from 'components'
import List from 'components/List'
import { value as value } from 'helpers'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { exportExcel } from 'utils/exportExcel'
import columns from './columns'
import TIME_ENTRIES from './TIME_ENTRIES'
import styles from './Reports.module.scss'

/**
 * @category Reports
 */
export const Reports = () => {
    const { t } = useTranslation(['common', 'reports'])
    const filters: BaseFilter[] = [
        new ResourceFilter('resourceName', t('employeeLabel')),
    ]
    const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(undefined)
    const [variables, setVariables] = useState({})
    const [subset, setSubset] = useState<any[]>(undefined)
    const { loading, error, data } = useQuery(
        TIME_ENTRIES,
        {
            skip: Object.keys(variables).length === 0,
            fetchPolicy: 'cache-first',
            variables,
        })

    const timeentries = data ? data.timeentries : []


    const onExportExcel = () => exportExcel(
        subset || timeentries,
        {
            columns: columns(t),
            fileName: `TimeEntries-${new Date().toDateString().split(' ').join('-')}.xlsx`,
        }
    )

    /**
     * On filterr updated in FilterPanel
     * 
     * @param {IFilter[]} filters 
     */
    const onFilterUpdated = (filters: IFilter[]) => {
        const _entries = timeentries.filter(entry => {
            return filters.filter(f => {
                const selectedKeys = f.selected.map(s => s.key)
                return selectedKeys.indexOf(value(entry, f.key, '')) !== -1
            }).length === filters.length
        })
        setSubset(_entries)
    }

    return (
        <div className={styles.root}>
            <List
                items={subset || timeentries}
                columns={columns(t)}
                enableShimmer={loading}
                commandBar={{
                    items: [
                        {

                            id: 'PREVIOUS_MONTH',
                            key: 'PREVIOUS_MONTH',
                            text: t('previousMonth'),
                            iconProps: { iconName: 'Previous' },
                            onClick: () => setVariables({ monthNumber: 8, year: 2020 })
                        },
                        {

                            id: 'CURRENT_MONTH',
                            key: 'CURRENT_MONTH',
                            text: t('currentMonth'),
                            iconProps: { iconName: 'Calendar' },
                            onClick: () => setVariables({ monthNumber: 9, year: 2020 })
                        },
                        {
                            id: 'CURRENT_YEAR',
                            key: 'CURRENT_YEAR',
                            text: t('currentYear'),
                            iconProps: { iconName: 'CalendarReply' },
                            onClick: () => setVariables({ year: 2020 })
                        },
                        {
                            id: 'PROGRESS_INDICATOR',
                            key: 'PROGRESS_INDICATOR',
                            onRender: () => {
                                if (!loading) return null
                                return (
                                    <ProgressIndicator
                                    className={styles.progress}
                                        label={t('generatingReportLabel', { ns: 'reports' })}
                                        description={t('generatingReportDescription', { ns: 'reports' })} />
                                )
                            }
                        }
                    ],
                    farItems: [
                        {
                            id: 'EXPORT_TO_EXCEL',
                            key: 'EXPORT_TO_EXCEL',
                            text: t('exportCurrentView'),
                            onClick: onExportExcel,
                            iconProps: { iconName: 'ExcelDocument' },
                            disabled: loading || !!error,
                        },
                        {
                            key: 'OPEN_FILTER_PANEL',
                            iconProps: { iconName: 'Filter' },
                            iconOnly: true,
                            onClick: () => setFilterPanelOpen(true),
                            disabled: loading || Object.keys(variables).length === 0

                        }
                    ]
                }} />
            <UserMessage
                hidden={timeentries.length > 0 || loading || Object.keys(variables).length === 0}
                text={t('noEntriesText', { ns: 'reports' })} />
            <UserMessage
                hidden={Object.keys(variables).length > 0}
                text={t('selectReportText', { ns: 'reports' })} />
            <FilterPanel
                isOpen={filterPanelOpen}
                filters={filters}
                entries={timeentries}
                onDismiss={() => setFilterPanelOpen(false)}
                onFilterUpdated={onFilterUpdated} />
        </div>
    )
}