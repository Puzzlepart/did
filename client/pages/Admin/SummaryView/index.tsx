
import { useQuery } from '@apollo/react-hooks'
import { UserMessage } from 'components'
import List from 'components/List'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import React, { useEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { first, isEmpty } from 'underscore'
import dateUtils from 'utils/date'
import { commandBar } from './commandBar'
import { createColumns } from './createColumns'
import { createPeriods } from './createPeriods'
import { createRows } from './createRows'
import styles from './SummaryView.module.scss'
import { reducer } from './reducer'
import TIME_ENTRIES, { ITimeEntriesVariables } from './TIME_ENTRIES'
import { getViewTypes, ISummaryViewContext, ISummaryViewProps } from './types'

/**
 * @category Admin
 */
export const SummaryView = (props: ISummaryViewProps): JSX.Element => {
    const { t } = useTranslation(['common', 'admin'])
    const types = getViewTypes(t)
    const [state, dispatch] = useReducer(reducer, {
        year: props.defaultYear,
        maxMonth: dateUtils.getMonthIndex(),
        timeentries: [],
        range: props.defaultRange,
        type: first(types),
    })
    const { data, loading } = useQuery<any, ITimeEntriesVariables>(TIME_ENTRIES, {
        fetchPolicy: 'cache-first',
        variables: {
            year: state.year,
            minMonthNumber: (state.maxMonth - state.range) + 1,
            maxMonthNumber: state.maxMonth,
        }
    })

    useEffect(() => { dispatch({ type: 'DATA_UPDATED', payload: data }) }, [data])

    const contextValue: ISummaryViewContext = useMemo(() => ({
        ...state,
        dispatch,
        types,
        loading,
    }), [state, loading])
    const periods = useMemo(() => createPeriods(1), [])
    const columns = useMemo(() => createColumns(state, t), [state])
    const rows = useMemo(() => createRows(state, columns, t), [state])

    return (
        <Pivot
            className={styles.root}
            defaultSelectedKey={props.defaultYear.toString()}
            onLinkClick={item => dispatch({ type: 'CHANGE_YEAR', payload: parseInt(item.props.itemKey) })}
            styles={{ itemContainer: { paddingTop: 10 } }}>
            {periods.map(itemProps => (
                <PivotItem key={itemProps.itemKey} {...itemProps}>
                    <List
                        hidden={!loading && isEmpty(rows)}
                        enableShimmer={loading}
                        columns={columns}
                        items={rows}
                        commandBar={commandBar(contextValue, rows, columns, t)} />
                    <UserMessage
                        hidden={!isEmpty(rows) || loading}
                        text={t('noTimeEntriesText', { ns: 'admin' })} />
                </PivotItem>
            ))}
        </Pivot>
    )
}