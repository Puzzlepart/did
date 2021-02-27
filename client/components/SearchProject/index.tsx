import { useQuery } from '@apollo/client'
import * as React from 'react'
import { Project } from 'types'
import { Autocomplete, ISuggestionItem } from '../Autocomplete'
import $projects from './projects.gql'
import { ISearchProjectProps } from './types'

export const SearchProject = (props: ISearchProjectProps) => {
  const { loading, data } = useQuery<{ projects: Project[] }>($projects, {
    fetchPolicy: 'cache-first'
  })

  const items: ISuggestionItem<Project>[] = (data?.projects || []).map(
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
    <Autocomplete<Project>
      {...props}
      disabled={loading}
      items={items}
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
