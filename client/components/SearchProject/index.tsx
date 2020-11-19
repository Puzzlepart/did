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

  const items: ISuggestionItem<Project>[] = data
    ? data.projects.map((project) => ({
        key: project.id,
        displayValue: `${project.name} (${project.id})`,
        searchValue: [project.id, project.name, project.customer.name].join(' '),
        data: project
      }))
    : []

  return (
    <Autocomplete<Project>
      {...props}
      disabled={loading}
      items={items}
      width={props.width}
      placeholder={props.placeholder}
      onClear={() => props.onSelected(null)}
      onSelected={(item) => props.onSelected(item.data)}
    />
  )
}
