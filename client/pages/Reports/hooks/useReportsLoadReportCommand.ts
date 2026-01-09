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
  const largeReportLimit = 5000

  return useMemo(() => {
    if (!context.loadReport || !context.queryPreset) return
    if (
      !['last_month', 'current_month', 'last_year', 'current_year', 'forecast'].includes(
        context.queryPreset.id
      )
    ) {
      return
    }
    const text =
      typeof approxCount === 'number' && approxCount > largeReportLimit
        ? t('reports.loadApproxEntriesFirst', {
          count: approxCount,
          limit: largeReportLimit
        })
        : t('reports.loadApproxEntries', { count: approxCount })

    return new ListMenuItem(text)
      .setGroup('actions')
      .withIcon('Play')
      .setDisabled(isPreloading)
      .setHidden(isReportLoaded)
      .setOnClick(() => context.loadReport())
  }, [
    context.loadReport,
    approxCount,
    isPreloading,
    isReportLoaded,
    t,
    largeReportLimit
  ])
}
