
import { useQuery } from '@apollo/react-hooks';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { IProject } from 'interfaces/IProject';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import { GET_PROJECTS } from 'pages/Projects/GET_PROJECTS';
import * as React from 'react';
import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import styles from './SearchProject.module.scss';
import { ISearchProjectProps } from './types';

/**
 * @category SearchProject
 */
export const SearchProject = (props: ISearchProjectProps) => {
    const [projects, setProjects] = useState<IProject[]>(null);
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const { loading, data } = useQuery(GET_PROJECTS, { skip: !!projects, variables: { sortBy: 'name' }, fetchPolicy: 'cache-first', });

    React.useEffect(() => { (!loading && !!data) && setProjects(data.projects); }, [data, loading]);
 
    const getSuggestions = (value: string, maxSuggestions = 5) => {
        const inputValue = value.trim().toLowerCase();
        if (inputValue.length === 0) return [];
        return [...projects].filter(project => {
            const searchString = [project.name, project.customer.name, project.id].join(' ').toLowerCase();
            let isMatch = searchString.indexOf(inputValue) !== -1;
            if (props.customer) isMatch = isMatch && project.customer.id === props.customer.id;
            return isMatch;
        }).splice(0, maxSuggestions);
    };

    const getDisplayValue = (project: IProject) => `${project.name} [${project.id}]`;

    const renderSuggestion = (project: IProject, { query }: any) => {
        return (
            <div style={{ marginLeft: 4, padding: 4, cursor: 'pointer' }}>
                <div>
                    {AutosuggestHighlightParse(getDisplayValue(project), AutosuggestHighlightMatch(getDisplayValue(project), query)).map((part, index) => {
                        const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;
                        return (
                            <span className={className} key={index}>
                                {part.text}
                            </span>
                        );
                    })}
                </div>
                <div style={{ fontSize: '7pt' }}>
                    <span>for </span>
                    {AutosuggestHighlightParse(project.customer.name, AutosuggestHighlightMatch(project.customer.name, query)).map((part, index) => {
                        const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;
                        return (
                            <span className={className} key={index}>
                                {part.text}
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (!projects) return (
        <>
            <Shimmer />
            <Shimmer />
        </>
    );

    return (
        <div className={styles.root}>
            <AutoSuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
                onSuggestionsClearRequested={() => setSuggestions([])}
                getSuggestionValue={getDisplayValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={(_event, { suggestion }) => props.onSelected(suggestion)}
                inputProps={{
                    placeholder: props.placeholder,
                    value,
                    onChange: (_event: any, { newValue }) => setValue(newValue),
                    width: '100%',
                }} />
        </div>
    );
}