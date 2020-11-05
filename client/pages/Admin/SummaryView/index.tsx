
import { useQuery } from '@apollo/client'
import { UserMessage } from 'components'
import List from 'components/List'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import React, { useEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { first, isEmpty } from 'underscore'
import DateUtils from 'utils/date'
import { commandBar } from './commandBar'
import { createColumns, createRows, createPeriods } from './utils'
import styles from './SummaryView.module.scss'
import { reducer } from './reducer'
import TIME_ENTRIES from './TIME_ENTRIES'
import { getScopes, getViewTypes, ISummaryViewProps, ISummaryViewScope } from './types'
import { ISummaryViewContext } from './context'

export const SummaryView = (props: ISummaryViewProps): JSX.Element => {
    const { t } = useTranslation()
    const types = getViewTypes(t)
    const scopes = getScopes(t)
    const [state, dispatch] = useReducer(reducer, {
        year: props.defaultSelectedYear,
        endMonthIndex: DateUtils.getMonthIndex(),
        timeentries: [],
        range: props.defaultRange,
        type: first(types),
        scope: first(scopes),
    })
    const { data, loading } = useQuery(TIME_ENTRIES, {
        fetchPolicy: 'cache-first',
        variables: {
            query: {
                year: state.year,
                startMonthIndex: (state.endMonthIndex - state.range) + 1,
                endMonthIndex: state.endMonthIndex,
            }
        }
    })

    useEffect(() => { dispatch({ type: 'DATA_UPDATED', payload: data }) }, [data])

    const columns = useMemo(() => createColumns(state, t), [state])
    const context: ISummaryViewContext = useMemo(() => ({
        ...state,
        dispatch,
        types,
        loading,
        t,
        periods: createPeriods(1),
        scopes,
        columns,
        rows: createRows(state, columns, t),
    }), [state, loading])

    return (
        <div className={styles.root}>
            <Pivot
                defaultSelectedKey={props.defaultSelectedYear.toString()}
                onLinkClick={item => dispatch({ type: 'CHANGE_YEAR', payload: parseInt(item.props.itemKey) })}>
                {context.periods.map(period => (
                    <PivotItem key={period.itemKey} {...period}>
                        <Pivot onLinkClick={item => dispatch({ type: 'CHANGE_SCOPE', payload: item.props as ISummaryViewScope })}>
                            {context.scopes.map(scope => (
                                <PivotItem key={scope.itemKey} {...scope}>
                                    <div className={styles.container}>
                                        <List
                                            hidden={!loading && isEmpty(context.rows)}
                                            enableShimmer={loading}
                                            columns={columns}
                                            items={context.rows}
                                            commandBar={commandBar(context)} />
                                        <UserMessage
                                            hidden={!isEmpty(context.rows) || loading}
                                            text={t('admin.noTimeEntriesText')} />
                                    </div>
                                </PivotItem>
                            ))}
                        </Pivot>
                    </PivotItem>
                ))}
            </Pivot>
        </div>
    )
}