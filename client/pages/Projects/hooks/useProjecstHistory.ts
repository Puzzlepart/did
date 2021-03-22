/* eslint-disable react-hooks/exhaustive-deps */
import { useAppContext } from 'AppContext'
import { useLayoutEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { UPDATE_BREADCRUMB } from '../../../app/reducer'
import { IProjectsParameters, IProjectsState } from '../types'

/**
 * Update history using `useHistory` on `state` change
 *
 * @param state  -State
 */
export function useProjecstHistory(state: IProjectsState) {
  const { dispatch } = useAppContext()
  const history = useHistory()
  const url = useParams<IProjectsParameters>()

  useLayoutEffect(() => {
    const paths = [state.view, state.selected?.tag || url.key, state.detailsTab]
    const path = `/${['projects', ...paths]
      .filter((p) => p)
      .join('/')}`.toLowerCase()
    history.push(path)
    if (state.selected) {
      dispatch(
        UPDATE_BREADCRUMB([
          {
            key: state.selected.tag,
            text: state.selected.name,
            level: 2
          }
        ])
      )
    }
  }, [state.view, state.selected, state.detailsTab, history, url.key])
}
