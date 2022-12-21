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
    const paths = [
      'projects',
      state.currentTab,
      state.selected?.tag ?? url.projectKey
    ]
    const path = createPath(paths)
    history.push(path)
  }, [state.currentTab, state.selected, history, url.projectKey])
}
