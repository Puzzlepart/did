import {QueryResult} from '@apollo/client';
import {createAction} from '@reduxjs/toolkit';
import {Customer} from 'types';
import {CustomersView} from '../types';

export const DATA_UPDATED = createAction<{query: QueryResult}>('DATA_UPDATED');
export const SET_SELECTED_CUSTOMER = createAction<{customer: Customer}>(
	'SET_SELECTED_CUSTOMER'
);
export const CHANGE_VIEW = createAction<{view: CustomersView}>('CHANGE_VIEW');
