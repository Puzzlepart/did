import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsContext } from '../context'
import { useColumns } from './useColumns'
import { useMenuItems } from './useMenuItems'

/**
 * This hook to gather all hooks calls for the `ReportsList` component.
 */
export function useReportsList() {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  const columns = useColumns()
  const menuItems = useMenuItems()
  return { t, context, columns, menuItems }
}
