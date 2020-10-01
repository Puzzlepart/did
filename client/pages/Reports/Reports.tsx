import { useQuery } from '@apollo/react-hooks'
import { BaseFilter, CustomerFilter, FilterPanel, IFilter, ProjectFilter, ResourceFilter, UserMessage } from 'components'
import List from 'components/List'
import { value } from 'helpers'
import { Pivot } from 'office-ui-fabric-react/lib/Pivot'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { exportExcel } from 'utils/exportExcel'
import columns from './columns'
import commandBar from './commandBar'
import { IReportsContext } from './context'
import styles from './Reports.module.scss'
import TIME_ENTRIES, { ITimeEntriesVariables } from './TIME_ENTRIES'
import { IReportsState } from './types'

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
    const [state, setState] = useState<IReportsState>({
        groupBy: {
            fieldName: '.',
            emptyGroupName: t('common.all'),
        }
    })
    const { loading, data } = useQuery<any, ITimeEntriesVariables>(
        TIME_ENTRIES,
        {
            skip: !state.query,
            fetchPolicy: 'cache-first',
            variables: state.query?.variables,
        })

    const timeentries = data?.timeentries || []

    /**
     * On export to Excel
     */
    const onExportExcel = () => exportExcel(
        state.subset || timeentries,
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
        const subset = timeentries.filter(entry => {
            return filters.filter(f => {
                const selectedKeys = f.selected.map(s => s.key)
                return selectedKeys.indexOf(value(entry, f.key, '')) !== -1
            }).length === filters.length
        })
        setState({ ...state, subset })
    }

    const ctx: IReportsContext = useMemo(() => ({
        ...state,
        loading,
        setState: (_state) => setState({ ...state, ..._state }),
        onExportExcel,
        t,
    }), [loading, state])

    return (
        <div className={styles.root}>
            <Pivot>
                {}
                <List
                    items={state.subset || timeentries}
                    groups={{
                        ...state.groupBy,
                        totalFunc: items => {
                            const totalDuration = (items.reduce((sum, item) => sum + item.duration, 0) as number).toFixed(0)
                            return format(t('common.headerTotalDuration'), totalDuration)
                        },
                    }}
                    columns={columns(t)}
                    enableShimmer={loading}
                    commandBar={commandBar(ctx)} />
                {loading && (
                    <Spinner
                        className={styles.spinner}
                        labelPosition='right'
                        label={t('reports.generatingReportLabel')} />
                )}
                <UserMessage
                    hidden={timeentries.length > 0 || loading || !state.query}
                    text={t('reports.noEntriesText')} />
                <UserMessage
                    hidden={!!state.query}
                    iconName='ReportDocument'
                    text={t('reports.selectReportText')} />
                <FilterPanel
                    isOpen={state.isFiltersOpen}
                    filters={filters}
                    entries={timeentries}
                    onDismiss={() => setState({ ...state, isFiltersOpen: false })}
                    onFilterUpdated={onFilterUpdated} />
            </Pivot>
        </div>
    )
}