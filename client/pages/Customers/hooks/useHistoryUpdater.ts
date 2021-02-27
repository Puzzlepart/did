/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ICustomersParams, ICustomersState } from '../types'

/**
 * Update history hook on state change
 *
 * @param {IProjectsState} state State
 */
export function useHistoryUpdater(state: ICustomersState) {
  const history = useHistory()
  const url = useParams<ICustomersParams>()

  useLayoutEffect(() => {
    const paths = [state.view, state.selected?.key || url.key]
    const path = `/${['customers', ...paths]
      .filter((p) => p)
      .join('/')}`.toLowerCase()
    history.push(path)
  }, [state.view, state.selected, url.key])
}
