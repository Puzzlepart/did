import { useQuery } from '@apollo/react-hooks'
import { BaseFilter, CustomerFilter, FilterPanel, IFilter, ProjectFilter, ResourceFilter, UserMessage } from 'components'
import List from 'components/List'
import { IListGroups } from 'components/List/types'
import { value as value } from 'helpers'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { exportExcel } from 'utils/exportExcel'
import columns from './columns'
import { exportToExcel, openFilterPanel, selectGroupBy, selectQuery } from './commands'
import styles from './Reports.module.scss'
import TIME_ENTRIES, { ITimeEntriesVariables } from './TIME_ENTRIES'
import { IReportsQuery } from './types'

/**
 * @category Reports
 */
export const Reports = () => {
    const { t } = useTranslation()
    const filters: BaseFilter[] = [
        new ResourceFilter('resourceName', t('common.employeeLabel')),
        new CustomerFilter('customer.name', t('common.customer')),
        new ProjectFilter('project.name', t('common.project')),
    ]
    const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(undefined)
    const [query, setQuery] = useState<IReportsQuery>()
    const [groupBy, setGroupBy] = useState<IListGroups>({
        fieldName: '.',
        emptyGroupName: t('common.all'),
    })
    const [subset, setSubset] = useState<any[]>(undefined)
    const { loading, data } = useQuery<any, ITimeEntriesVariables>(
        TIME_ENTRIES,
        {
            skip: !query,
            fetchPolicy: 'cache-first',
            variables: query && query.variables,
        })

    const timeentries = data?.timeentries || []

    /**
     * On export to Excel
     */
    const onExportExcel = () => exportExcel(
        subset || timeentries,
        {
            columns: columns(t),
            fileName: `TimeEntries-${new Date().toDateString().split(' ').join('-')}.xlsx`,
        }
    )

    /**
     * On filter updated in FilterPanel
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
                groups={{
                    ...groupBy,
                    totalFunc: items => {
                        const totalDuration = (items.reduce((sum, item) => sum + item.duration, 0) as number).toFixed(0)
                        return format(t('common.headerTotalDuration'), totalDuration)
                    },
                }}
                columns={columns(t)}
                enableShimmer={loading}
                commandBar={{
                    items: [
                        selectQuery(query, setQuery, t),
                        (query && !loading) && selectGroupBy(groupBy, setGroupBy, t),
                    ].filter(i => i),
                    farItems: [
                        (query && !loading) && exportToExcel(onExportExcel, t),
                        (query && !loading)  && openFilterPanel(setFilterPanelOpen)
                    ].filter(i => i)
                }} />
            {loading && (
                <Spinner
                    className={styles.spinner}
                    labelPosition='right'
                    label={t('reports.generatingReportLabel')} />
            )}
            <UserMessage
                hidden={timeentries.length > 0 || loading || !query}
                text={t('reports.noEntriesText')} />
            <UserMessage
                hidden={!!query}
                iconName='ReportDocument'
                text={t('reports.selectReportText')} />
            <FilterPanel
                isOpen={filterPanelOpen}
                filters={filters}
                entries={timeentries}
                onDismiss={() => setFilterPanelOpen(false)}
                onFilterUpdated={onFilterUpdated} />
        </div>
    )
}