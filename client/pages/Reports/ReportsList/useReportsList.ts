/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
import { createElement, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsContext } from '../context'
import { useColumns } from './columns/useColumns'
import { useMenuItems } from './useMenuItems'
import { IListProps } from 'components'
import { Caption1 } from '@fluentui/react-components'
import { IReportsListProps } from './types'

/**
 * This hook to gather all hooks calls for the `ReportsList` component.
 *
 * @param props - The props for the `ReportsList` component.
 */
export function useReportsList(props: IReportsListProps) {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  const columns = useColumns()
  const menuItems = useMenuItems(props)

  const createPlaceholder: IListProps['searchBox']['placeholder'] = (state) => {
    const hours = state.origItems
      .reduce((acc, item) => acc + item.duration, 0)
      .toFixed(0)
    return t('reports.searchPlaceholder', {
      hours,
      count: state.origItems.length,
      preset: context.queryPreset?.text?.toLowerCase()
    })
  }

  const createContentAfter: IListProps['searchBox']['contentAfter'] = (
    state
  ) => {
    return createElement(
      Caption1,
      null,
      t('reports.searchCount', {
        count: state.items.length,
        total: state.origItems.length
      })
    )
  }

  return {
    t,
    context,
    columns,
    menuItems,
    createPlaceholder,
    createContentAfter
  }
}
