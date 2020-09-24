import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { Slider } from 'office-ui-fabric-react/lib/Slider'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner'
import React from 'react'
import dateUtils from 'utils/date'
import * as excelUtils from 'utils/exportExcel'
import styles from './SummaryView.module.scss'
import { ISummaryViewContext, ISummaryViewRow } from './types'

/**
 * Command bar items
 * 
 * @param {ISummaryViewContext} context Summary view context
 * @param {ISummaryViewRow[]} rows Rows
 * @param {IColumn[]} columns Columns
 * @param {TFunction} t Translate function
 */
export const commandBar = (
    context: ISummaryViewContext,
    rows: ISummaryViewRow[],
    columns: IColumn[],
    t: TFunction,
) => {
    return {
        items: [
            {
                ...context.type,
                key: 'VIEW_TYPE',
                disabled: context.loading,
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
                            },
                        }}
                        disabled={context.loading}
                        value={context.range}
                        min={2}
                        max={dateUtils.getMonthIndex()}
                        onChange={value => context.dispatch({ type: 'CHANGE_RANGE', payload: value })} />
                ),
            },
            {
                key: 'LOADING_SPINNER',
                name: '',
                onRender: () => context.loading && (
                    <Spinner
                        label={t('admin.summaryLoadingText')}
                        labelPosition='right' />
                )
            }
        ] as IContextualMenuItem[],
        farItems: [
            {
                key: 'EXPORT_TO_EXCEL',
                text: t('exportCurrentView'),
                iconProps: { iconName: 'ExcelDocument' },
                disabled: context.loading,
                onClick: () => {
                    excelUtils.exportExcel(
                        rows,
                        {
                            columns,
                            fileName: `Summary-${new Date().toDateString().split(' ').join('-')}.xlsx`,
                        })
                },
            }
        ],
    }
}