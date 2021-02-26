import { useLayoutEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { IProjectsParams, IProjectsState } from '../types'

/**
 * Update history hook on state change
 *
 * @param {IProjectsState} state State
 */
export function useHistoryUpdater(state: IProjectsState) {
  const history = useHistory()
  const url = useParams<IProjectsParams>()

  useLayoutEffect(() => {
    const paths = [state.view, state.selected?.tag || url.key, state.detailsTab]
    const path = `/${['projects', ...paths].filter((p) => p).join('/')}`.toLowerCase()
    history.push(path)
  }, [state.view, state.selected, state.detailsTab, history, url.key])
}
