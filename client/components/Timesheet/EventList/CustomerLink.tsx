
import * as React from 'react';

export const CustomerLink = ({ customer }) => customer ? <a href={`/customers#${customer.key}`}>{customer.name}</a> : null;
