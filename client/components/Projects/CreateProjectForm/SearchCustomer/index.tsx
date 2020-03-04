
import { useQuery } from '@apollo/react-hooks';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import GET_CUSTOMERS from 'components/Customers/CustomerList/GET_CUSTOMERS';
import { ICustomer } from 'interfaces';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { ISearchCustomerProps } from './ISearchCustomerProps';

/**
 * @component SearchCustomer
 * @description @todo
 */
export const SearchCustomer = (props: ISearchCustomerProps) => {
    let [customers, setCustomers] = useState<ICustomer[]>(null);
    let [suggestions, setSuggestions] = useState([]);
    let [value, setValue] = useState('');
    const { loading, data } = useQuery(GET_CUSTOMERS, { skip: !!customers, variables: { sortBy: 'name' }, fetchPolicy: 'cache-first', });

    React.useEffect(() => { (!loading && !!data) && setCustomers(data.customers); }, [data, loading]);

    /**
     * Get suggestions for value
     * 
     * @param {string} value Value
     * @param {number} maxSuggestions Max suggestions count
     */
    const getSuggestions = (value: string, maxSuggestions: number = 5) => {
        const inputValue = value.trim().toLowerCase();
        if (inputValue.length === 0) return [];
        return [...customers].filter(customer => {
            let searchString = [customer.name, customer.id].join(' ').toLowerCase();
            let isMatch = searchString.indexOf(inputValue) !== -1;
            return isMatch;
        }).splice(0, maxSuggestions);
    };

    /**
     * Get display value
     * 
     * @param {ICustomer} customer Customer
     */
    const getDisplayValue = (customer: ICustomer) => `${customer.name} [${customer.id}]`;

    /**
     * Render suggestion
     * 
     * @param {ICustomer} customer Customer
     * @param {any} param1 Params
     */
    const renderSuggestion = (customer: ICustomer, { query }: any) => {
        return (
            <div style={{ marginLeft: 4, padding: 4, cursor: 'pointer' }}>
                <div>
                    {AutosuggestHighlightParse(getDisplayValue(customer), AutosuggestHighlightMatch(getDisplayValue(customer), query)).map((part, index) => {
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

    if (!customers) return <TextField {...props} disabled={true} />;

    return (
        <div className='c-SearchCustomer'>
            <div className='c-SearchCustomer-wrapper'>
                <Label hidden={!props.label} required={props.required}>{props.label}</Label>
                <div className='c-SearchCustomer-fieldGroup'>
                    <AutoSuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
                        onSuggestionsClearRequested={() => setSuggestions([])}
                        getSuggestionValue={getDisplayValue}
                        renderSuggestion={renderSuggestion}
                        onSuggestionSelected={(_event, { suggestion }) => props.onSelected(suggestion)}
                        inputProps={{
                            className: 'c-SearchCustomer-field',
                            style: props.style,
                            placeholder: props.placeholder,
                            title: props.title,
                            value,
                            onChange: (_event: any, { newValue }) => setValue(newValue),
                            required: props.required,
                        }} />
                </div>
            </div>
        </div>
    );
}