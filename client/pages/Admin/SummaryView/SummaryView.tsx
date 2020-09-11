
import { useQuery } from '@apollo/react-hooks'
import { UserMessage } from 'components'
import List from 'components/List'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import React, { useEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { first, isEmpty } from 'underscore'
import dateUtils, { moment } from 'utils/date'
import { commandBar } from './commandBar'
import { createColumns } from './createColumns'
import { createPeriods } from './createPeriods'
import { createRows } from './createRows'
import { reducer } from './SummaryViewReducer'
import { getScopes } from './SummaryViewScope'
import { getTypes } from './SummaryViewType'
import TIME_ENTRIES, { ITimeEntriesVariables } from './TIME_ENTRIES'
import { ISummaryViewContext } from './types'

/**
 * @category Admin
 */
export const SummaryView = (): JSX.Element => {
    const { t } = useTranslation(['common', 'admin'])
    const scopes = getScopes(t)
    const types = getTypes(t)
    const [state, dispatch] = useReducer(reducer, {
        year: moment().year(),
        timeentries: [],
        range: 3,
        scope: first(scopes),
        type: first(types),
    })
    const { data, loading } = useQuery<any, ITimeEntriesVariables>(TIME_ENTRIES, {
        fetchPolicy: 'cache-first',
        variables: {
            year: state.year,
            minMonthNumber: dateUtils.getMonthIndex() - state.range + 1,
            maxMonthNumber: dateUtils.getMonthIndex(),
        },
    })

    useEffect(() => { dispatch({ type: 'DATA_UPDATED', payload: data }) }, [data])

    const contextValue: ISummaryViewContext = useMemo(() => ({
        ...state,
        dispatch,
        scopes,
        types,
    }), [state])
    const periods = useMemo(() => createPeriods(0), [])
    const columns = useMemo(() => createColumns(state, t), [state])
    const items = useMemo(() => createRows(state, columns, t), [state])

    return (
        <Pivot
            defaultSelectedKey={moment().year().toString()}
            onLinkClick={item => dispatch({ type: 'CHANGE_YEAR', payload: parseInt(item.props.itemKey) })}
            styles={{ itemContainer: { paddingTop: 10 } }}>
            {periods.map(itemProps => (
                <PivotItem key={itemProps.itemKey} {...itemProps}>
                    <List
                        hidden={!loading && isEmpty(items)}
                        enableShimmer={loading}
                        columns={columns}
                        items={items}
                        commandBar={commandBar(contextValue, items, columns, t)} />
                    <UserMessage
                        hidden={!isEmpty(items) || loading}
                        text={t('noTimeEntriesText', { ns: 'admin' })} />
                </PivotItem>
            ))}
        </Pivot>
    )
}