/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { Project } from 'types'
import { arrayMap } from 'utils'
import { ISuggestionItem } from '../Autocomplete'
import $projects from './projects.gql'

/**
 * Component logic hook for `<SearchProject />`
 */
export function useSearchProject(): [ISuggestionItem<Project>[], boolean] {
  const { data, loading } = useQuery($projects, {
    fetchPolicy: 'cache-first'
  })

  const items: ISuggestionItem<Project>[] = useMemo(() =>
    arrayMap<any>(data?.projects,
      (project) => ({
        key: project.tag,
        text: project.name,
        secondaryText: project.tag,
        searchValue: [project.tag, project.name, project.customer.name].join(' '),
        data: project,
        iconName: project.icon
      })
    ), [data])

  return [items, loading]
}
