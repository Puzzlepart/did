import {
	DISMISS_CALLOUT,
	ON_KEY_DOWN,
	ON_SEARCH,
	RESET,
	SET_SELECTED_INDEX
} from './reducer';

/**
 * Use Autocomplete events
 *
 * @category Autocomplete
 */
export function useAutocompleteEvents({dispatch, props}) {
	return {
		onDismissCallout: (item: any) => {
			dispatch(DISMISS_CALLOUT({item}));
			props.onSelected(item);
		},
		onSetSelected: (index: number) => dispatch(SET_SELECTED_INDEX({index})),
		onSearch: (_: any, searchTerm: string) => dispatch(ON_SEARCH({searchTerm})),
		onClear: () => {
			dispatch(RESET());
			props.onClear();
		},
		onKeyDown: () => (event: React.KeyboardEvent<HTMLDivElement>) =>
			dispatch(
				ON_KEY_DOWN({
					key: event.which,
					onEnter: item => props.onSelected(item)
				})
			)
	};
}
