/* eslint-disable unicorn/prevent-abbreviations */
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'underscore'
import { IReportsContext, useReportsContext } from '../context'
import { IReportsParameters } from '../types'

/**
 * Returns a memoized query preset from the given reports context based on 
 * the queryPreset URL parameter. The `reportLinks` property is also set on 
 * the query preset.
 * 
 * @param context - The reports context containing the queries to search through.
 */
export function useReportsQueryPreset(context?: IReportsContext) {
  const { queries, state } = useReportsContext(context)
  const params = useParams<IReportsParameters>()
  const queryPreset = useMemo(() => {
    const _queryPreset = _.find(queries, ({ id }) => id === params.queryPreset)
    _queryPreset.reportLinks = state.data.reportLinks ? state.data.reportLinks.filter(({ linkRef }) => linkRef === _queryPreset.reportLinkRef) : []
    return _queryPreset
  }, [params.queryPreset, state.data.reportLinks])
  return queryPreset
}
