import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { Slider } from 'office-ui-fabric-react/lib/Slider'
import React from 'react'
import * as excelUtils from 'utils/exportExcel'
import { ISummaryViewContext } from './types'
import styles from './SummaryView.module.scss'

export const commandBar = (
    context: ISummaryViewContext,
    items: any[],
    columns: IColumn[],
    t: TFunction,
) => {
    return {
        items: [
            {
                ...context.scope,
                key: 'VIEW_SCOPE',
                subMenuProps: {
                    items: context.scopes.map(scope => ({
                        ...scope,
                        canCheck: true,
                        checked: context.scope.key === scope.key,
                        onClick: () => context.dispatch({ type: 'CHANGE_SCOPE', payload: scope })
                    })),
                },
                className: styles.viewScopeSelector
            },
            {
                ...context.type,
                key: 'VIEW_TYPE',
                subMenuProps: {
                    items: context.types.map(type => ({
                        ...type,
                        canCheck: true,
                        checked: context.type.key === type.key,
                        onClick: () => context.dispatch({ type: 'CHANGE_TYPE', payload: type })
                    })),
                },
                className: styles.viewTypeSelector
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
                        max={6}
                        onChange={value => context.dispatch({ type: 'CHANGE_RANGE', payload: value })} />
                ),
            },
            {
                key: 'LOADING',
                name: '',
                onRender: () => context.loading && (
                    <Spinner
                        label={t('summaryLoadingText', { ns: 'admin' })}
                        labelPosition='right' />
                )
            }
        ] as IContextualMenuItem[],
        farItems: [
            {
                key: 'EXPORT_TO_EXCEL',
                text: t('exportCurrentView'),
                iconProps: { iconName: 'ExcelDocument' },
                onClick: () => {
                    excelUtils.exportExcel(
                        items,
                        {
                            columns,
                            fileName: `Summary-${new Date().toDateString().split(' ').join('-')}.xlsx`,
                        })
                },
            }
        ],
    }
}