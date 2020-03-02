
import { useQuery } from '@apollo/react-hooks';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { GET_PROJECTS } from 'components/Projects/GET_PROJECTS';
import { IProject, ICustomer } from 'interfaces';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import * as React from 'react';
import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';

interface ISearchProjectProps {
    onSelected: any;
    customer: ICustomer;
    placeholder: string;
}

/**
 * @component SearchProject
 * @description @todo
 */
export const SearchProject = ({ onSelected, customer, placeholder }: ISearchProjectProps) => {
    let [projects, setProjects] = useState<IProject[]>(null);
    let [suggestions, setSuggestions] = useState([]);
    let [value, setValue] = useState('');
    const { loading, data } = useQuery(GET_PROJECTS, { skip: !!projects, variables: { sortBy: 'name' }, fetchPolicy: 'cache-first', });

    React.useEffect(() => { (!loading && !!data) && setProjects(data.projects); }, [data, loading]);

    /**
     * Get suggestions for value
     * 
     * @param {string} value Value
     * @param {number} maxSuggestions Max suggestions count
     */
    const getSuggestions = (value: string, maxSuggestions: number = 5) => {
        const inputValue = value.trim().toLowerCase();
        if (inputValue.length === 0) return [];
        return [...projects].filter(project => {
            let searchString = [project.name, project.customer.name, project.id].join(' ').toLowerCase();
            let isMatch = searchString.indexOf(inputValue) !== -1;
            if (customer) isMatch = isMatch && project.customer.id === customer.id;
            return isMatch;
        }).splice(0, maxSuggestions);
    };

    /**
     * Get display value
     * 
     * @param {IProject} project Project
     */
    const getDisplayValue = (project: IProject) => `${project.name} [${project.id}]`;

    /**
     * Render suggestion
     * 
     * @param {IProject} project Project
     * @param {any} param1 Params
     */
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
        <AutoSuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
            onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={getDisplayValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={(_event, { suggestion }) => onSelected(suggestion)}
            inputProps={{
                placeholder,
                value,
                onChange: (_event: any, { newValue }) => setValue(newValue),
                width: '100%',
            }} />
    );
}