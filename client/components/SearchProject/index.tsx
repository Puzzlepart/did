
import { useQuery } from '@apollo/react-hooks'
import { IProject } from 'interfaces/IProject'
import { GET_PROJECTS } from 'pages/Projects/types'
import * as React from 'react'
import { Autocomplete, ISuggestionItem } from '../Autocomplete'
import { ISearchProjectProps } from './types'

/**
 * @category SearchProject
 */
export const SearchProject = (props: ISearchProjectProps) => {
    const { loading, data } = useQuery<{ projects: IProject[] }>(GET_PROJECTS, {
        variables: { sortBy: 'name' },
        fetchPolicy: 'cache-first'
    })

    const searchData: ISuggestionItem<IProject>[] = data ? data.projects.map(project => ({
        key: project.key,
        displayValue: `${project.name} (${project.id})`,
        searchValue: [project.key, project.name, project.customerKey, project.customer.key].join(' '),
        data: project,
    })) : []


    return (
        <Autocomplete<IProject>
            {...props}
            disabled={loading}
            items={searchData}
            width={450}
            placeholder={props.placeholder}
            onClear={() => props.onSelected(null)}
            onSelected={item => props.onSelected(item.data)} />
    )
}