/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import React from 'react'
import { Project } from 'types'
import { Autocomplete, ISuggestionItem } from '../Autocomplete'
import $projects from './projects.gql'
import { ISearchProjectProps } from './types'

/**
 * Search for projects using `<Autocomplete />`
 *
 * @category Function Component
 */
export const SearchProject: React.FC<ISearchProjectProps> = (props) => {
  const { loading, data } = useQuery<{ projects: Project[] }>($projects, {
    fetchPolicy: 'cache-first'
  })

  const searchData: ISuggestionItem<Project>[] = (data?.projects || []).map(
    (project) => ({
      key: project.tag,
      text: project.name,
      secondaryText: project.tag,
      searchValue: [project.tag, project.name, project.customer.name].join(' '),
      data: project,
      iconName: project.icon
    })
  )

  return (
    <Autocomplete
      {...props}
      disabled={loading}
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
