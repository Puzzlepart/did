/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { List, UserMessage } from 'components'
import { DateObject } from 'DateUtils'
import { Pivot, PivotItem } from 'office-ui-fabric-react'
import React, { useEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { first, isEmpty } from 'underscore'
import { commandBar } from './commandBar'
import { ISummaryViewContext, SummaryViewContext } from './context'
import { reducer } from './reducer'
import styles from './SummaryView.module.scss'
import $summary_view from './summary_view.gql'
import { getScopes, ISummaryViewScope } from './types'
import { createColumns, createRows } from './utils'

/**
 * @category Function Component
 */
export const SummaryView = (): JSX.Element => {
  const { t } = useTranslation()
  const scopes = getScopes(t)
  const [state, dispatch] = useReducer(reducer, {
    timeentries: [],
    range: {
      from: new DateObject().add('-8week').startOfWeek,
      to: new DateObject().endOfWeek
    },
    scope: first(scopes)
  })
  const { data, loading } = useQuery($summary_view, {
    fetchPolicy: 'cache-first'
  })

  useEffect(() => {
    dispatch({ type: 'DATA_UPDATED', payload: data })
  }, [data])

  const columns = useMemo(() => createColumns(state, t), [state, t])
  const context = useMemo<ISummaryViewContext>(
    () => ({
      ...state,
      dispatch,
      loading,
      t,
      scopes,
      columns,
      rows: createRows(state, columns, t)
    }),
    [state, loading, columns, scopes, t]
  )

  return (
    <div className={styles.root}>
      <SummaryViewContext.Provider value={context}>
        <Pivot
          onLinkClick={(item) =>
            dispatch({
              type: 'CHANGE_SCOPE',
              payload: item.props as ISummaryViewScope
            })
          }>
          {context.scopes.map((scope) => (
            <PivotItem
              key={scope.itemKey}
              {...scope}
              headerButtonProps={{ disabled: true }}>
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
      </SummaryViewContext.Provider>
    </div>
  )
}
