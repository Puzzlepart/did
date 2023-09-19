import { useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ITimesheetParameters } from '../types'
import { createTimesheetReducer } from './createTimesheetReducer'
import { initState } from './initState'

/**
 * Use Timesheet reducer
 */
export function useTimesheetReducer() {
  const { t } = useTranslation()
  const url = useParams<ITimesheetParameters>()
  const reducer = useMemo(() => createTimesheetReducer({ t, url }), [])
  return useReducer(reducer, initState({ url }))
}
