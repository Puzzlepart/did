import format from 'string-format'
import { IListColumn } from 'components/List/types'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TimeEntry, User } from 'types'
import { exportExcel } from 'utils/exportExcel'
import { debugLogger } from 'utils'
import { useLazyQuery } from '@apollo/client'
import report_custom from 'pages/Reports/queries/report-custom.gql'
import { DateObject } from 'DateUtils'

interface IUseExcelExportWithProgressOptions {
  query: any
  queryVariables?: any
  fileName: string
  columns: IListColumn[]
  isLargeDataset?: boolean
  batchSize?: number
  presetId?: string // e.g., 'current_year', 'last_year' for generating preset query
}

interface ExportProgress {
  isExporting: boolean
  totalEntries: number
  loadedEntries: number
  progress: number
  currentBatch: number
  totalBatches: number
  stage: 'loading' | 'processing' | 'generating' | 'complete'
}

/**
 * Safety limit: Maximum total entries to fetch across all batches.
 * Set to 200,000 based on browser memory constraints and Excel's practical limits.
 * Prevents memory exhaustion when exporting very large datasets.
 */
const MAX_TOTAL_ENTRIES = 200_000

/**
 * Multiplier for estimating total entries from batch size.
 * Used as (batchSize * 25) to estimate maximum expected entries.
 * Value of 25 chosen based on typical year-long reports with daily entries.
 */
const BATCH_SIZE_MULTIPLIER = 25

/**
 * Maximum consecutive empty batches before stopping pagination.
 * Prevents unnecessary API calls when no more data is available.
 */
const MAX_CONSECUTIVE_EMPTY_BATCHES = 2

/**
 * Generate query parameters for preset queries
 * Mirrors server-side _generatePresetQuery logic
 */
function generatePresetQuery(presetId?: string): Record<string, any> {
  if (!presetId) return {}

  const dateObject = new DateObject()

  switch (presetId) {
    case 'last_month': {
      const lastMonth = dateObject.add('-1month').toObject()
      return {
        month: lastMonth.month,
        year: lastMonth.year
      }
    }
    case 'current_month': {
      const current = dateObject.toObject()
      return {
        month: current.month,
        year: current.year
      }
    }
    case 'last_year': {
      const lastYear = dateObject.toObject('year').year - 1
      return { year: lastYear }
    }
    case 'current_year': {
      const currentYear = dateObject.toObject('year').year
      return { year: currentYear }
    }
    default: {
      return {}
    }
  }
}

/**
 * Joins time entries with user data to populate resource fields.
 *
 * @param entries - Time entries with resource.id
 * @param users - Full user data
 * @returns Time entries with complete resource data
 */
function mapTimeEntries(entries: TimeEntry[], users: User[]): TimeEntry[] {
  if (!users || users.length === 0) {
    return entries
  }

  return entries.map((entry) => {
    if (!entry.resource?.id) {
      return entry
    }

    const resource = users.find(({ id }) => id === entry.resource?.id)
    if (!resource) {
      return entry
    }

    const manager = users.find(({ id }) => id === resource.manager?.id)

    return {
      ...entry,
      resource: {
        id: entry.resource.id,
        ...resource,
        manager
      } as User
    }
  })
}

/**
 * Excel export hook with progress tracking for large datasets
 *
 * @category React Hook
 */
export function useExcelExportWithProgress({
  query,
  queryVariables,
  fileName,
  columns,
  isLargeDataset = false,
  batchSize = 5000,
  presetId
}: IUseExcelExportWithProgressOptions) {
  const { t } = useTranslation()
  const [progress, setProgress] = useState<ExportProgress>({
    isExporting: false,
    totalEntries: 0,
    loadedEntries: 0,
    progress: 0,
    currentBatch: 0,
    totalBatches: 0,
    stage: 'loading'
  })

  // Track if component is mounted and if an export is in progress
  const isMountedRef = useRef(true)
  const abortControllerRef = useRef<AbortController | null>(null)
  const isExportingRef = useRef(false)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // For large datasets with pagination, use report_custom query which supports limit/skip
  // For small datasets, use the original query (which might be a preset query)
  const effectiveQuery = isLargeDataset ? report_custom : query

  const [executeQuery] = useLazyQuery(effectiveQuery, {
    fetchPolicy: 'no-cache'
  })

  const exportAllData = async () => {
    // Check ref for truly synchronous check
    if (isExportingRef.current) {
      debugLogger.log(
        '[Excel Export] Export already in progress, ignoring request'
      )
      return
    }

    // Set both ref and state
    isExportingRef.current = true
    abortControllerRef.current = new AbortController()

    setProgress({
      isExporting: true,
      totalEntries: 0,
      loadedEntries: 0,
      progress: 0,
      currentBatch: 0,
      totalBatches: 0,
      stage: 'loading'
    })

    try {
      let allEntries: TimeEntry[] = []
      let users: User[] = []
      let totalBatches = 0

      // For large datasets, use pagination
      if (isLargeDataset) {
        // For preset queries, generate the preset parameters and pass them as query.
        // Note: We cannot reliably infer "end of dataset" from the number of returned
        // report entries in a batch, because the server may filter out entries during
        // report generation (e.g., missing project/customer/resource), yielding fewer
        // than `limit` even when more raw time entries exist. Instead, we paginate
        // until we hit consecutive empty batches (or safety limits).
        const presetQuery = generatePresetQuery(presetId)
        const queryOverrides = queryVariables?.query
        const baseQuery = presetId
          ? (queryOverrides
            ? { ...presetQuery, ...queryOverrides }
            : presetQuery)
          : queryOverrides ?? {}

        // Estimate total batches conservatively (used for progress display only)
        const estimatedTotal = Math.min(
          MAX_TOTAL_ENTRIES,
          batchSize * BATCH_SIZE_MULTIPLIER
        )
        totalBatches = Math.ceil(estimatedTotal / batchSize)

        setProgress((prev) => ({
          ...prev,
          totalEntries: estimatedTotal,
          totalBatches,
          loadedEntries: 0
        }))

        // Fetch in batches; stop only on consecutive empty batches or safety limits.
        let skip = 0
        let hasMore = true
        let batchNumber = 0
        let consecutiveEmptyBatches = 0

        const dynamicBatchLimit = Math.ceil(MAX_TOTAL_ENTRIES / batchSize) + 2
        const effectiveBatchLimit = dynamicBatchLimit

        while (hasMore && batchNumber < effectiveBatchLimit) {
          // Check if export was cancelled
          if (abortControllerRef.current?.signal.aborted) {
            debugLogger.log('[Excel Export] Export cancelled by user')
            return
          }

          batchNumber++

          if (isMountedRef.current) {
            setProgress((prev) => ({
              ...prev,
              currentBatch: batchNumber,
              stage: 'loading'
            }))
          }

          const result = await executeQuery({
            variables: {
              query: {
                ...baseQuery,
                limit: batchSize,
                skip
              }
            }
          })

          // Extract entries from result - handle different possible field names
          const batchEntries =
            result.data?.timeEntries || result.data?.report || []

          // Users data is the same across all batches, only fetch once
          if (users.length === 0 && result.data?.users) {
            users = result.data.users
          }

          debugLogger.log(
            `[Excel Export] Batch ${batchNumber}: skip=${skip}, limit=${batchSize}, got ${batchEntries.length} entries`
          )

          if (batchEntries.length === 0) {
            consecutiveEmptyBatches++
            debugLogger.log(
              `[Excel Export] Empty batch (${consecutiveEmptyBatches}/${MAX_CONSECUTIVE_EMPTY_BATCHES})`
            )
            if (consecutiveEmptyBatches >= MAX_CONSECUTIVE_EMPTY_BATCHES) {
              debugLogger.log(
                `[Excel Export] Stopping due to ${consecutiveEmptyBatches} consecutive empty batches`
              )
              hasMore = false
            }
          } else {
            consecutiveEmptyBatches = 0

            // Deduplicate entries by ID before adding to allEntries
            if (allEntries.length > 0) {
              const existingIds = new Set(
                allEntries
                  .map((e) => e.id)
                  .filter((id) => id !== null && id !== undefined)
                  .map(String)
              )

              const uniqueNewEntries = batchEntries.filter((entry) => {
                const id = entry.id
                if (id === null || id === undefined) {
                  // Keep entries without IDs (edge case)
                  return true
                }
                const isDuplicate = existingIds.has(String(id))
                if (isDuplicate) {
                  debugLogger.warn(
                    `[Excel Export] Skipping duplicate entry with id: ${id} in batch ${batchNumber}`
                  )
                }
                return !isDuplicate
              })

              const duplicateCount =
                batchEntries.length - uniqueNewEntries.length
              if (duplicateCount > 0) {
                debugLogger.warn(
                  `[Excel Export] Removed ${duplicateCount} duplicate entries from batch ${batchNumber}`
                )
              }

              allEntries = [...allEntries, ...uniqueNewEntries]
            } else {
              allEntries = [...batchEntries]
            }
          }

          const loadedEntries = allEntries.length
          const reachedMaxLimit = loadedEntries >= MAX_TOTAL_ENTRIES

          if (reachedMaxLimit) {
            debugLogger.warn(
              `[Excel Export] Stopped at MAX_TOTAL_ENTRIES safety limit (${MAX_TOTAL_ENTRIES} entries)`
            )
            hasMore = false
          }

          if (isMountedRef.current) {
            setProgress((prev) => ({
              ...prev,
              totalEntries: loadedEntries,
              loadedEntries,
              progress: Math.min(
                (batchNumber / Math.max(totalBatches, batchNumber)) * 70,
                70
              ),
              totalBatches: Math.max(totalBatches, batchNumber)
            }))
          }

          // Increment skip for next batch regardless of how many report entries were returned,
          // since pagination happens on the server's raw time entry query.
          skip += batchSize

          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      } else {
        // For small datasets, fetch all at once
        const result = await executeQuery({
          variables: queryVariables
        })
        allEntries = result.data?.timeEntries || result.data?.report || []
        users = result.data?.users || []

        if (isMountedRef.current) {
          setProgress((prev) => ({
            ...prev,
            totalEntries: allEntries.length,
            loadedEntries: allEntries.length,
            progress: 70,
            currentBatch: 1,
            totalBatches: 1
          }))
        }
      }

      // Check if cancelled before proceeding
      if (abortControllerRef.current?.signal.aborted) {
        debugLogger.log('[Excel Export] Export cancelled before mapping')
        return
      }

      // Map time entries with user data to populate resource fields
      debugLogger.log(
        `[Excel Export] Mapping ${allEntries.length} entries with ${users.length} users`
      )
      const mappedEntries = mapTimeEntries(allEntries, users)

      // Processing stage
      if (isMountedRef.current) {
        setProgress((prev) => ({
          ...prev,
          stage: 'processing',
          progress: 80
        }))
      }

      // Generate Excel file
      if (isMountedRef.current) {
        setProgress((prev) => ({
          ...prev,
          stage: 'generating',
          progress: 90
        }))
      }

      const formattedFileName = format(
        fileName,
        new Date().toDateString().split(' ').join('-')
      )

      await exportExcel(mappedEntries, {
        columns,
        fileName: formattedFileName
      })

      // Complete
      if (isMountedRef.current) {
        setProgress((prev) => ({
          ...prev,
          stage: 'complete',
          progress: 100,
          isExporting: false
        }))

        // Reset after a short delay
        setTimeout(() => {
          if (isMountedRef.current) {
            setProgress({
              isExporting: false,
              totalEntries: 0,
              loadedEntries: 0,
              progress: 0,
              currentBatch: 0,
              totalBatches: 0,
              stage: 'loading'
            })
          }
        }, 3000)
      }
    } catch (error) {
      // Don't update state if component unmounted or export was cancelled
      if (!isMountedRef.current) {
        debugLogger.log(
          '[Excel Export] Component unmounted, skipping error state update'
        )
        return
      }

      if (abortControllerRef.current?.signal.aborted) {
        debugLogger.log('[Excel Export] Export was cancelled')
        return
      }

      debugLogger.error('Error exporting to Excel:', error)
      setProgress({
        isExporting: false,
        totalEntries: 0,
        loadedEntries: 0,
        progress: 0,
        currentBatch: 0,
        totalBatches: 0,
        stage: 'loading'
      })
    } finally {
      // Always clean up refs
      isExportingRef.current = false
      abortControllerRef.current = null
    }
  }

  const getProgressMessage = () => {
    if (!progress.isExporting) return ''

    switch (progress.stage) {
      case 'loading': {
        return isLargeDataset
          ? t('reports.exportProgressLoadingBatch', {
              current: progress.currentBatch,
              total: progress.totalBatches || '?'
            })
          : t('reports.exportProgressLoading')
      }
      case 'processing': {
        return t('reports.exportProgressProcessing', {
          count: progress.totalEntries
        })
      }
      case 'generating': {
        return t('reports.exportProgressGenerating')
      }
      case 'complete': {
        return t('reports.exportProgressComplete')
      }
      default: {
        return t('reports.exportProgressDefault')
      }
    }
  }

  return {
    exportAllData,
    progress,
    progressMessage: getProgressMessage(),
    isExporting: progress.isExporting
  }
}
