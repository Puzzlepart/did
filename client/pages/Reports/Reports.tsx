import { useQuery } from '@apollo/react-hooks'
import { BaseFilter, CustomerFilter, FilterPanel, IFilter, ProjectFilter, ResourceFilter, UserMessage } from 'components'
import List from 'components/List'
import { IListGroups } from 'components/List/types'
import { value as value } from 'helpers'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner'
import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { exportExcel } from 'utils/exportExcel'
import columns from './columns'
import styles from './Reports.module.scss'
import TIME_ENTRIES, { ITimeEntriesVariables } from './TIME_ENTRIES'
import { IReportsQuery, getGroupByOptions, getQueries } from './types'
import { pick } from 'underscore'
import { IContextualMenuItem } from 'office-ui-fabric-react'
import { format } from 'office-ui-fabric-react/lib/Utilities'

/**
 * @category Reports
 */
export const Reports = () => {
    const { t } = useTranslation(['common', 'reports'])
    const filters: BaseFilter[] = [
        new ResourceFilter('resourceName', t('employeeLabel')),
        new CustomerFilter('customer.name', t('customer')),
        new ProjectFilter('project.name', t('project')),
    ]
    const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(undefined)
    const [query, setQuery] = useState<IReportsQuery>()
    const [groupBy, setGroupBy] = useState<IListGroups>({
        fieldName: '.',
        emptyGroupName: t('all'),
    })
    const [subset, setSubset] = useState<any[]>(undefined)
    const { loading, error, data } = useQuery<any, ITimeEntriesVariables>(
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

    const queries = getQueries(t)
    const groupByOptions = getGroupByOptions(t)

    return (
        <div className={styles.root}>
            <List
                items={subset || timeentries}
                groups={{
                    ...groupBy,
                    totalFunc: items => {
                        const totalDuration = (items.reduce((sum, item) => sum + item.duration, 0) as number).toFixed(0)
                        return format(t('headerTotalDuration'), totalDuration)
                    },
                }}
                columns={columns(t)}
                enableShimmer={loading}
                commandBar={{
                    items: [
                        {
                            key: 'SELECT_QUERY',
                            text: query?.text || t('selectReportLabel', { ns: 'reports' }),
                            iconProps: { iconName: query?.iconName || 'ReportDocument' },
                            subMenuProps: {
                                items: queries.map(query => ({
                                    ...pick(query, 'key', 'text'),
                                    iconProps: { iconName: query.iconName },
                                    onClick: () => setQuery(query),
                                })),
                            }
                        },
                        {
                            key: 'GROUP_BY',
                            text: t('groupBy'),
                            iconProps: { iconName: 'GroupList' },
                            disabled: !query || loading,
                            subMenuProps: {
                                items: groupByOptions.map(opt => ({
                                    ...pick(opt, 'key', 'text'),
                                    canCheck: true,
                                    checked: groupBy.fieldName === opt.props.fieldName,
                                    onClick: () => setGroupBy(opt.props),
                                } as IContextualMenuItem)),
                            }
                        },
                    ],
                    farItems: [
                        {
                            key: 'EXPORT_TO_EXCEL',
                            text: t('exportCurrentView'),
                            onClick: onExportExcel,
                            iconProps: { iconName: 'ExcelDocument' },
                            disabled: loading || !!error || !query,
                        },
                        {
                            key: 'OPEN_FILTER_PANEL',
                            iconProps: { iconName: 'Filter' },
                            iconOnly: true,
                            onClick: () => setFilterPanelOpen(true),
                            disabled: loading || !!error || !query,
                        }
                    ]
                }} />
            {loading && (
                <Spinner
                    className={styles.spinner}
                    labelPosition='right'
                    label={t('generatingReportLabel', { ns: 'reports' })} />
            )}
            <UserMessage
                hidden={timeentries.length > 0 || loading || !query}
                text={t('noEntriesText', { ns: 'reports' })} />
            <UserMessage
                hidden={!!query}
                iconName='ReportDocument'
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