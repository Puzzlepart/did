import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { Project } from 'types'
import { arrayMap } from 'utils'
import { ISuggestionItem } from '../FormControl/AutocompleteControl'
import $projects from './projects.gql'

/**
 * Component logic hook for `<SearchProject />`. Handles
 * fetching of projects using the query in `projects.gql`,
 * removes inactive projects and maps the result to an
 * array of `ISuggestionItem<Project>`.
 */
export function useSearchProject() {
  const { data, loading } = useQuery<{ projects: Project[] }>($projects, {
    fetchPolicy: 'cache-and-network'
  })

  const projects = data?.projects.filter((project) => !project.inactive)

  const items: ISuggestionItem<Project>[] = useMemo(
    () =>
      arrayMap<any>(projects, (project) => ({
        key: project.tag,
        text: project.name,
        secondaryText: project.tag,
        searchValue: [project.tag, project.name, project?.customer?.name].join(
          ' '
        ),
        data: project,
        iconName: project.icon
      })),
    [data]
  )

  return [items, loading] as const
}
