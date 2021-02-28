import {getValue} from 'helpers';
import React, {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import {IDurationColumnProps} from './types';

/**
 * @category Function Component
 */
export const DurationColumn: FunctionComponent<IDurationColumnProps> = ({
	row,
	column
}: IDurationColumnProps) => {
	const {t} = useTranslation();
	const style = {...getValue(column, 'data.style', {})};

	if (row.label === t('common.sumLabel')) {
		style.fontWeight = 500;
	}

	const colValue = row[column.fieldName] ?
		Number.parseFloat(row[column.fieldName]).toFixed(2) :
		null;

	return <div style={style}>{colValue}</div>;
};

export * from './types';
