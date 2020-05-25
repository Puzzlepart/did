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

/**
 * @category Reports
 */
export const Reports = () => {
    const { t } = useTranslation(['COMMON', 'reports'])
    const filters: BaseFilter[] = [
        new WeekFilter('weekNumber', t('weekNumberLabel')),
        new MonthFilter('monthNumber', t('monthLabel')),
        new YearFilter('yearNumber', t('yearLabel')),
        new ResourceFilter('resourceName', t('employeeLabel')),
    ]
    const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(undefined)
    const [subset, setSubset] = useState<any[]>(undefined)
    const { loading, error, data } = useQuery<{ timeentries: any[] }>(TIME_ENTRIES, { fetchPolicy: 'cache-first' })

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


    if (loading) return (
        <ProgressIndicator
            label={t('generatingReportLabel', { ns: 'reports' })}
            description={t('generatingReportDescription', { ns: 'reports' })} />
    )

    return (
        <div>
            <List
                hidden={timeentries.length === 0 && !loading}
                items={subset || timeentries}
                columns={columns(t)}
                enableShimmer={loading}
                commandBar={{
                    items: [
                        {
                            id: 'EXPORT_TO_EXCEL',
                            key: 'EXPORT_TO_EXCEL',
                            text: t('exportCurrentView'),
                            onClick: onExportExcel,
                            iconProps: { iconName: 'ExcelDocument' },
                            disabled: loading || !!error,
                        },
                    ],
                    farItems: [
                        {
                            key: 'OPEN_FILTER_PANEL',
                            iconProps: { iconName: 'Filter' },
                            iconOnly: true,
                            onClick: () => setFilterPanelOpen(true),
                        }
                    ]
                }} />
            <UserMessage
                hidden={timeentries.length > 0 || loading}
                text={t('noEntriesText', { ns: 'reports' })} />
            <FilterPanel
                isOpen={filterPanelOpen}
                filters={filters}
                entries={timeentries}
                onDismiss={() => setFilterPanelOpen(false)}
                onFilterUpdated={onFilterUpdated} />
        </div>
    )
}