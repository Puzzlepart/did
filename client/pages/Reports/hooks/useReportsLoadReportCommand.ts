import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ListMenuItem } from 'components/List'
import { useReportsContext } from '../context'

/**
 * Creates the "Load (approx N entries)" command for Reports.
 *
 * @category Reports Hooks
 */
export function useReportsLoadReportCommand() {
  const { t } = useTranslation()
  const context = useReportsContext()

  const approxCount = context.state?.preload?.approxCount
  const isPreloading = Boolean(context.state?.preload?.loading)
  const isReportLoaded = Boolean(context.state?.isReportLoaded)

  return useMemo(() => {
    if (!context.loadReport) return

    const countText = approxCount ?? '…'
    const text = t('reports.loadApproxEntries', { count: countText })

    return new ListMenuItem(text)
      .setGroup('actions')
      .withIcon('Play')
      .setDisabled(isPreloading)
      .setHidden(isReportLoaded)
      .setOnClick(() => context.loadReport())
  }, [context.loadReport, approxCount, isPreloading, isReportLoaded, t])
}
