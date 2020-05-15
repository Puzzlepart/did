import { DurationColumn } from 'components/DurationColumn';
import { LabelColumn } from 'components/LabelColumn';
import { value } from 'helpers';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { unique } from 'underscore';
import { generateColumn as col } from 'utils/generateColumn';
import { ISummaryViewState } from './types';

export function createColumns({ scope, range, timeentries }: ISummaryViewState): IColumn[] {
    const { t } = useTranslation('COMMON');
    const data = unique(
        timeentries.map(e => value(e, scope.fieldName, null)), m => m
    ).sort((a, b) => a - b);

    const onRender = (row: any, _index: number, col: IColumn) => (
        <DurationColumn row={row} column={col} />
    );

    let columns = data.map(key => ({
        key: key,
        fieldName: key,
        name: scope.getColumnHeader(key),
        minWidth: 70,
        maxWidth: 70,
        onRender,
    }));

    if (range < columns.length) {
        columns = columns.splice(data.length - range);
    }

    return [
        col(
            'label',
            '',
            {
                minWidth: 350,
                maxWidth: 350,
                isMultiline: true,
                isResizable: true,
            },
            (row: any) => <LabelColumn row={row} />
        ),
        ...columns,
        col(
            'sum',
            t('SUM_LABEL'),
            {
                minWidth: 50,
                maxWidth: 50,
                isResizable: false,
                data: { style: { fontWeight: 500 } },
            },
            onRender,
        ),
    ];
}