import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox';

export interface IAutocompleteProps extends ISearchBoxProps {
  items: ISuggestionItem[];
  suggestionCallback: (item: ISuggestionItem) => void;
  searchCallback: (item: string) => void;
  noSuggestionsText?: string;
  displayValueKey?: string;
  searchValueKey?: string;
}

export interface IAutocompleteState {
  isSuggestionDisabled: boolean;
  searchText: string;
}

export interface ISuggestionItem {
  key: string | number;
  displayValue: string;
  searchValue: string;
  type?: string;
  tag?: any;
}
