/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ITimesheetParameters } from '../types'
import { initState } from './initState'
import { createTimesheetReducer } from './createTimesheetReducer'

/**
 * Use Timesheet reducer
 */

export function useTimesheetReducer() {
  const { t } = useTranslation()
  const url = useParams<ITimesheetParameters>()
  const reducer = useMemo(() => createTimesheetReducer({ t, url }), [])
  return useReducer(reducer, initState(url))
}
