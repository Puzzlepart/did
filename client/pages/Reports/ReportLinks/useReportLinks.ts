/* eslint-disable unicorn/prevent-abbreviations */
import { useContext, useMemo } from 'react'
import { ReportsContext } from '../context'
import _ from 'underscore'
import { useParams } from 'react-router-dom'
import { IReportLinksProps } from './types'

/**
 * Custom hook that returns an object containing an array of report links based on the query preset parameter.
 * 
 * @param props - The props for the `ReportLinks` component.
 */
export function useReportLinks(props:IReportLinksProps) {
  const params = useParams<{ queryPreset?: string; }>()
  const context = useContext(ReportsContext)
  const queryPreset = useMemo(() => _.find(context.queries, (q) => q.id === params.queryPreset), [params.queryPreset])
  if(props.promoted) {
    return { reportLinks: context.state.data.reportLinks.filter(({ promoted }) => promoted) }
  }
  if (!queryPreset) {
    return { reportLinks: [] }
  }
  const reportLinks = context.state.data.reportLinks.filter(({ linkRef }) => linkRef === queryPreset.reportLinkRef)
  return { reportLinks }
}
