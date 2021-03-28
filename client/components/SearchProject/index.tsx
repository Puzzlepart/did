/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { ReusableComponent } from 'components/types'
import React, { useMemo } from 'react'
import { Project } from 'types'
import { Autocomplete, ISuggestionItem } from '../Autocomplete'
import $projects from './projects.gql'
import { ISearchProjectProps } from './types'

/**
 * Search for projects using `<Autocomplete />`
 *
 * @category Reusable Component
 */
export const SearchProject: ReusableComponent<ISearchProjectProps> = (
  props
) => {
  const query = useQuery<{ projects: Project[] }>($projects, {
    fetchPolicy: 'cache-first'
  })

  const searchData: ISuggestionItem<Project>[] = useMemo(() => (query.data?.projects || []).map(
    (project) => ({
      key: project.tag,
      text: project.name,
      secondaryText: project.tag,
      searchValue: [project.tag, project.name, project.customer.name].join(' '),
      data: project,
      iconName: project.icon
    })
  ), [query.data])

  return (
    <Autocomplete
      {...props}
      disabled={query.loading}
      items={searchData}
      itemIcons={{
        style: {
          marginTop: 8,
          fontSize: 16
        }
      }}
      width={props.width}
      placeholder={props.placeholder}
      onClear={() => props.onSelected(null)}
      onSelected={(item) => props.onSelected(item.data)}
    />
  )
}
