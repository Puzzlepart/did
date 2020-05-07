
import { useQuery } from '@apollo/react-hooks';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { ICustomer } from 'interfaces';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import GET_CUSTOMERS from 'pages/Customers/GET_CUSTOMERS';
import * as React from 'react';
import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { ISearchCustomerProps } from './ISearchCustomerProps';
import styles from './SearchCustomer.module.scss';

/**
 * @category Projects
 */
export const SearchCustomer = (props: ISearchCustomerProps) => {
    const [customers, setCustomers] = useState<ICustomer[]>(null);
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const { loading, data } = useQuery(GET_CUSTOMERS, { skip: !!customers, variables: { sortBy: 'name' }, fetchPolicy: 'cache-first', });

    
    React.useEffect(() => { (!loading && !!data) && setCustomers(data.customers); }, [data, loading]);

    /**
     * Get suggestions for value
     * 
     * @param {string} value Value
     * @param {number} maxSuggestions Max suggestions count
     */
    const getSuggestions = (value: string, maxSuggestions = 5) => {
        const inputValue = value.trim().toLowerCase();
        if (inputValue.length === 0) return [];
        return [...customers].filter(customer => {
            const searchString = [customer.name, customer.id].join(' ').toLowerCase();
            const isMatch = searchString.indexOf(inputValue) !== -1;
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
            <div containerStyle={{ marginLeft: 4, padding: 4, cursor: 'pointer' }}>
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
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <Label hidden={!props.label} required={props.required}>{props.label}</Label>
                <div className={styles.fieldGroup}>
                    <AutoSuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
                        onSuggestionsClearRequested={() => setSuggestions([])}
                        getSuggestionValue={getDisplayValue}
                        renderSuggestion={renderSuggestion}
                        onSuggestionSelected={(_event, { suggestion }) => props.onSelected(suggestion)}
                        inputProps={{
                            className: styles.field,
                            containerStyle: props.containerStyle,
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