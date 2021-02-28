import {ISearchBoxProps} from 'office-ui-fabric-react';
import {ISuggestionItem} from './SuggestionItem/types';

/**
 * @ignore
 */
export type AutocompleteSelectCallback<T = any> = (
	item: ISuggestionItem<T>
) => void;

/**
 * @ignore
 */
export type AutocompleteItemIcons = {
	style: React.CSSProperties;
};

/**
 * @category Autocomplete
 */
export interface IAutocompleteProps<T = any> extends ISearchBoxProps {
	label?: string;
	description?: string;
	itemIcons?: AutocompleteItemIcons;
	onSelected: AutocompleteSelectCallback<T>;
	items?: Array<ISuggestionItem<T>>;
	noSuggestionsText?: string;
	defaultSelectedKey?: string;
	errorMessage?: string;
	maxHeight?: number;
}

/**
 * @category Autocomplete
 */
export interface IAutocompleteState<T = any> {
	items?: Array<ISuggestionItem<T>>;
	suggestions?: Array<ISuggestionItem<T>>;
	isSuggestionDisabled?: boolean;
	value?: string;
	selectedItem?: ISuggestionItem;
	selectedIndex?: number;
}

export * from './SuggestionItem/types';
