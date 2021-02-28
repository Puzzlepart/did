import {useContext, useEffect, useState} from 'react';
import {Customer} from 'types';
import {CustomersContext} from '../context';
import {SET_SELECTED_CUSTOMER} from '../reducer/actions';

export const useCustomerList = () => {
	const {dispatch, state, loading} = useContext(CustomersContext);
	const [items, setItems] = useState([...state.customers]);
	const [showInactive, setShowInactive] = useState(false);

	useEffect(() => {
		setItems(
			[...state.customers].filter(p => (showInactive ? true : !p.inactive))
		);
	}, [state.customers, showInactive]);
	return {
		loading,
		state,
		items,
		setItems,
		showInactive,
		setShowInactive,
		setSelectedCustomer: (customer: Customer) => {
			dispatch(SET_SELECTED_CUSTOMER({customer}));
		}
	};
};
