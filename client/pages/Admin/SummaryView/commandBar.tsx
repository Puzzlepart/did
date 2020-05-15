import { TFunction } from 'i18next';
import { IColumn } from 'office-ui-fabric-react';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import React from 'react';
import * as excelUtils from 'utils/exportExcel';
import { ISummaryViewContext } from './types';

export const commandBar = (
    { scope, scopes, types, type, dispatch }: ISummaryViewContext,
    items: any[],
    columns: IColumn[],
    t: TFunction,
) => {
    return {
        items: [
            {
                ...scope,
                key: 'VIEW_SCOPE',
                subMenuProps: {
                    items: scopes.map(s => ({
                        ...s,
                        canCheck: true,
                        checked: scope.key === s.key,
                        onClick: () => dispatch({ type: 'CHANGE_SCOPE', payload: s })
                    })),
                },
            },
            {
                ...type,
                key: 'VIEW_TYPE',
                subMenuProps: {
                    items: types.map(t => ({
                        ...t,
                        canCheck: true,
                        checked: type.key === t.key,
                        onClick: () => dispatch({ type: 'CHANGE_TYPE', payload: t })
                    })),
                }
            },
            {
                key: 'RANGE',
                name: '',
                onRender: () => (
                    <Slider
                        styles={{
                            root: {
                                width: 300,
                                marginLeft: 10,
                                alignSelf: 'center',
                            }
                        }}
                        min={3}
                        max={12}
                        onChange={value => dispatch({ type: 'CHANGE_RANGE', payload: value })} />
                ),
            },
        ] as IContextualMenuItem[],
        farItems: [
            {
                key: 'EXPORT_TO_EXCEL',
                text: t('EXPORT_CURRENT_VIEW'),
                iconProps: { iconName: 'ExcelDocument' },
                onClick: () => {
                    excelUtils.exportExcel(
                        items,
                        {
                            columns,
                            fileName: `Summary-${new Date().toDateString().split(' ').join('-')}.xlsx`,
                        });
                },
            }
        ],
    };
}