/* eslint-disable @typescript-eslint/no-use-before-define */
import { useQuery } from '@apollo/react-hooks'
import { BaseFilter, CustomerFilter, FilterPanel, IFilter, ProjectFilter, ResourceFilter, UserMessage } from 'components'
import List from 'components/List'
import { value } from 'helpers'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { find, filter, isEmpty } from 'underscore'
import { exportExcel } from 'utils/exportExcel'
import columns from './columns'
import commandBar from './commandBar'
import { IReportsContext } from './context'
import styles from './Reports.module.scss'
import TIME_ENTRIES, { ITimeEntriesVariables } from './TIME_ENTRIES'
import { getQueries, IReportsParams, IReportsState } from './types'
import dateUtils from 'utils/date'

/**
 * @category Reports
 */
export const Reports = () => {
    const { t } = useTranslation()
    const history = useHistory()
    const params = useParams<IReportsParams>()
    const filters: BaseFilter[] = [
        new ResourceFilter('resourceName', t('common.employeeLabel')),
        new CustomerFilter('customer.name', t('common.customer')),
        new ProjectFilter('project.name', t('common.project')),
    ]
    const queries = getQueries(t)
    const [state, setState] = useState<IReportsState>({
        query: find(queries, q => q.key === params.query),
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

    /**
     * On export to Excel
     */
    const onExportExcel = () => {
        const fileName = format(
            state.query.exportFileName,
            new Date().toDateString().split(' ').join('-')
        )
        exportExcel(
            state.subset || context.timeentries,
            {
                columns: columns(t),
                fileName,
            }
        )
    }

    /**
     * On filter updated in FilterPanel
     * 
     * @param {IFilter[]} filters 
     */
    const onFilterUpdated = (filters: IFilter[]) => {
        const subset = filter(context.timeentries, entry => {
            return filter(filters, f => {
                const selectedKeys = f.selected.map(s => s.key)
                return selectedKeys.indexOf(value(entry, f.key, '')) !== -1
            }).length === filters.length
        })
        context.setState({ subset })
    }

    /**
     * On change query
     * 
     * @param {string} key Query key 
     */
    const onChangeQuery = (key: string) => {
        const query = find(queries, q => q.key === key)
        context.setState({ query })
        history.push(`/reports/${key}`)
    }



    const context: IReportsContext = useMemo(() => ({
        ...state,
        timeentries: data?.timeentries || [],
        loading,
        setState: (_state) => setState({ ...state, ..._state }),
        onExportExcel,
        t,
    }), [loading, state])

    return (
        <div className={styles.root}>
            <Pivot
                defaultSelectedKey={params.query || 'default'}
                onLinkClick={item => onChangeQuery(item.props.itemKey)}>
                {queries.map(query => (
                    <PivotItem
                        key={query.key}
                        itemKey={query.key}
                        headerText={query.text}
                        itemIcon={query.iconName}>
                        <div className={styles.container}>
                            {loading && (
                                <Spinner
                                    className={styles.spinner}
                                    labelPosition='right'
                                    label={t('reports.generatingReportLabel')} />
                            )}
                            {!loading && (
                                <List
                                    fadeIn={{
                                        transitionDuration: 500,
                                        delay: 200,
                                    }}
                                    items={state.subset || context.timeentries}
                                    groups={{
                                        ...state.groupBy,
                                        totalFunc: items => {
                                            const durationHrs = (items.reduce((sum, item) => sum + item.duration, 0) as number)
                                            return t('common.headerTotalDuration', { duration: dateUtils.getDurationString(durationHrs, t) })
                                        },
                                    }}
                                    columns={columns(t)}
                                    commandBar={commandBar(context)} />
                            )}
                            <UserMessage
                                hidden={!isEmpty(context.timeentries) || loading || !state.query}
                                text={t('reports.noEntriesText')} />
                            <FilterPanel
                                isOpen={state.isFiltersOpen}
                                filters={filters}
                                entries={context.timeentries}
                                onDismiss={() => context.setState({ isFiltersOpen: false })}
                                onFilterUpdated={onFilterUpdated} />
                        </div>
                    </PivotItem>
                ))}
                <PivotItem
                    itemKey='default'
                    headerButtonProps={{ disabled: true }}>
                    <UserMessage
                        className={styles.container}
                        iconName='ReportDocument' text={t('reports.selectReportText')} />
                </PivotItem>
            </Pivot>
        </div>
    )
}