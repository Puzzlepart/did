/* eslint-disable react-hooks/exhaustive-deps */
import { useAppContext } from 'AppContext'
import { useLayoutEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { UPDATE_BREADCRUMB } from '../../../app/reducer'
import { ICustomersParameters, ICustomersState } from '../types'

/**
 * Update history using `useHistory` on `state` change
 *
 * @param state - State
 */
export function useCustomersHistory(state: ICustomersState) {
  const { dispatch } = useAppContext()
  const history = useHistory()
  const url = useParams<ICustomersParameters>()

  useLayoutEffect(() => {
    const paths = [state.view, state.selected?.key || url.key]
    const path = `/${['customers', ...paths]
      .filter((p) => p)
      .join('/')}`.toLowerCase()
    history.push(path)
    if (state.selected) {
      dispatch(
        UPDATE_BREADCRUMB([
          {
            key: state.selected.key,
            text: state.selected.name,
            level: 2
          }
        ])
      )
    }
  }, [state.view, state.selected, url.key])
}
