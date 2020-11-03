
import { useQuery } from '@apollo/client'
import { Project } from 'types'
import * as React from 'react'
import { Autocomplete, ISuggestionItem } from '../Autocomplete'
import { ISearchProjectProps } from './types'
import { GET_PROJECTS } from 'pages/Projects/graphql'

export const SearchProject = (props: ISearchProjectProps) => {
    const { loading, data } = useQuery<{ projects: Project[] }>(GET_PROJECTS, {
        variables: { sortBy: 'name' },
        fetchPolicy: 'cache-first'
    })

    const searchData: ISuggestionItem<Project>[] = data ? data.projects.map(project => ({
        key: project.id,
        displayValue: `${project.name} (${project.id})`,
        searchValue: [project.id, project.name, project.customerKey, project.customer.key].join(' '),
        data: project,
    })) : []

    return (
        <Autocomplete<Project>
            {...props}
            disabled={loading}
            items={searchData}
            width={props.width}
            placeholder={props.placeholder}
            onClear={() => props.onSelected(null)}
            onSelected={item => props.onSelected(item.data)} />
    )
}