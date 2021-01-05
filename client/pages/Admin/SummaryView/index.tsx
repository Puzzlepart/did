import { useQuery } from '@apollo/client'
import { UserMessage } from 'components'
import List from 'components/List'
import { Pivot, PivotItem } from 'office-ui-fabric'
import React, { useEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { first, isEmpty } from 'underscore'
import DateUtils from 'DateUtils'
import { commandBar } from './commandBar'
import { ISummaryViewContext } from './context'
import { reducer } from './reducer'
import styles from './SummaryView.module.scss'
import $timeentries from './timeentries.gql'
import { getScopes, getViewTypes, ISummaryViewScope } from './types'
import { createColumns, createPeriods, createRows } from './utils'

export const SummaryView = (): JSX.Element => {
  const { t } = useTranslation()
  const types = getViewTypes(t)
  const scopes = getScopes(t)
  const [state, dispatch] = useReducer(reducer, {
    endMonthIndex: DateUtils.getMonthIndex(),
    timeentries: [],
    range:null,
    type: first(types),
    scope: first(scopes)
  })
  const { data, loading } = useQuery($timeentries, {
    fetchPolicy: 'cache-first',
    variables: {
      query: {
        year: DateUtils.getYear(),
        startMonthIndex: state.endMonthIndex - 3 + 1,
        endMonthIndex: state.endMonthIndex
      }
    }
  })

  useEffect(() => {
    dispatch({ type: 'DATA_UPDATED', payload: data })
  }, [data])

  const columns = useMemo(() => createColumns(state, t), [state])
  const context: ISummaryViewContext = useMemo(
    () => ({
      ...state,
      dispatch,
      types,
      loading,
      t,
      periods: createPeriods(1),
      scopes,
      columns,
      rows: createRows(state, columns, t)
    }),
    [state, loading]
  )

  return (
    <div className={styles.root}>
      <Pivot
        onLinkClick={(item) =>
          dispatch({ type: 'CHANGE_SCOPE', payload: item.props as ISummaryViewScope })
        }>
        {context.scopes.map((scope) => (
          <PivotItem key={scope.itemKey} {...scope}>
            <div className={styles.container}>
              <List
                hidden={!loading && isEmpty(context.rows)}
                enableShimmer={loading}
                columns={columns}
                items={context.rows}
                commandBar={commandBar(context)}
              />
              <UserMessage
                hidden={!isEmpty(context.rows) || loading}
                text={t('admin.noTimeEntriesText')}
              />
            </div>
          </PivotItem>
        ))}
      </Pivot>
    </div>
  )
}
