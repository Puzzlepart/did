/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { createPath } from 'utils/createPath'
import { IProjectsState, IProjectsUrlParameters } from './types'

/**
 * Update history using `useHistory` on `state` change
 *
 * @param state  -State
 */
export function useProjectsHistory(state: IProjectsState) {
  const history = useHistory()
  const url = useParams<IProjectsUrlParameters>()

  useLayoutEffect(() => {
    const paths = [state.view, state.selected?.tag ?? url.key, state.detailsTab]
    const path = createPath(['projects', ...paths])
    history.push(path)
  }, [state.view, state.selected, state.detailsTab, history, url.key])
}
