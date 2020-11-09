import { IContextualMenuItem } from 'office-ui-fabric'
import { Slider } from 'office-ui-fabric'
import React from 'react'
import DateUtils from 'utils/date'
import * as excelUtils from 'utils/exportExcel'
import { ISummaryViewContext } from './context'
import styles from './SummaryView.module.scss'

/**
 * Command bar items
 * 
 * @param {ISummaryViewContext} context Summary view context
 */
export const commandBar = (context: ISummaryViewContext) => {
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
                    <>
                        <Slider
                            className={styles.rangeSlider}
                            valueFormat={value => context.t('admin.summaryRangeValueFormat', { value })}
                            disabled={context.loading}
                            value={context.range}
                            min={2}
                            max={DateUtils.getMonthIndex()}
                            onChange={value => context.dispatch({ type: 'CHANGE_RANGE', payload: value })} />
                    </>
                ),
            }
        ] as IContextualMenuItem[],
        farItems: [
            {
                key: 'EXPORT_TO_EXCEL',
                text: context.t('common.exportCurrentView'),
                iconProps: { iconName: 'ExcelDocument' },
                disabled: context.loading,
                onClick: () => {
                    excelUtils.exportExcel(
                        context.rows,
                        {
                            columns: context.columns,
                            fileName: `Summary-${new Date().toDateString().split(' ').join('-')}.xlsx`,
                        })
                },
            }
        ],
    }
}