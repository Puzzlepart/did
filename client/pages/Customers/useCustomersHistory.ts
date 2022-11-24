/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { createPath } from 'utils/createPath'
import { ICustomersState, ICustomersUrlParameters } from './types'

/**
 * Update history using `useHistory` on `state` change
 *
 * @param state - State
 */
export function useCustomersHistory(state: ICustomersState) {
  const history = useHistory()
  const url = useParams<ICustomersUrlParameters>()

  useLayoutEffect(() => {
    const paths = [state.view, state.selected?.key || url.customerKey]
    const path = createPath(['customers', ...paths])
    history.push(path)
  }, [state.view, state.selected, url.customerKey])
}
