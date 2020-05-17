import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox'

export interface IAutocompleteClassNames {
  suggestionsCallout?: string;
  suggestionContainer?: string;
  suggestion?: string;
}

export interface IAutocompleteProps extends ISearchBoxProps {
  items: ISuggestionItem[];
  onSelected: (item: ISuggestionItem) => void;
  searchCallback?: (item: string) => void;
  noSuggestionsText?: string;
  classNames?: IAutocompleteClassNames;
}

export interface IAutocompleteState {
  isSuggestionDisabled: boolean;
  searchText: string;
}
export interface ISuggestionItem<T = any> {
  key: string | number;
  displayValue: string;
  searchValue: string;
  type?: string;
  tag?: any;
  data?: T;
}
