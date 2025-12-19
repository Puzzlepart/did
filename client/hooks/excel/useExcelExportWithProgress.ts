import { format } from '@fluentui/react'
import { IListColumn } from 'components/List/types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TimeEntry } from 'types'
import { exportExcel } from 'utils/exportExcel'
import { debugLogger } from 'utils'
import { useLazyQuery } from '@apollo/client'

interface IUseExcelExportWithProgressOptions {
  query: any
  queryVariables?: any
  fileName: string
  columns: IListColumn[]
  isLargeDataset?: boolean
  batchSize?: number
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
 * Hard limit on number of batches to prevent infinite loops.
 * Set to 20 as an additional safety measure independent of entry count.
 * With default batchSize of 5000, this allows up to 100k entries.
 */
const MAX_BATCHES_HARD_LIMIT = 20

/**
 * Maximum consecutive empty batches before stopping pagination.
 * Prevents unnecessary API calls when no more data is available.
 */
const MAX_CONSECUTIVE_EMPTY_BATCHES = 2

/**
 * Multiplier for detecting data size exceeding estimates.
 * If actual entries exceed (estimated * this multiplier), export stops as a safety measure.
 */
const SAFETY_MULTIPLIER_OVER_ESTIMATE = 2

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
  batchSize = 5000
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

  const [executeQuery] = useLazyQuery(query, {
    fetchPolicy: 'no-cache'
  })

  const exportAllData = async () => {
    if (progress.isExporting) return

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
      let totalBatches = 0

      // For large datasets, use pagination
      if (isLargeDataset) {
        // Get first small batch to estimate total and determine batching strategy
        const firstBatch = await executeQuery({
          variables: {
            ...queryVariables,
            query: {
              ...queryVariables?.query,
              limit: 100,  // Small batch to estimate
              skip: 0
            }
          }
        })

        const firstBatchEntries = firstBatch.data?.timeEntries || firstBatch.data?.report || []
        
        if (firstBatchEntries.length < 100) {
          // If first batch is less than 100, we have the exact count
          allEntries = firstBatchEntries
          totalBatches = 1
          
          setProgress(prev => ({
            ...prev,
            totalEntries: firstBatchEntries.length,
            loadedEntries: firstBatchEntries.length,
            progress: 70,
            currentBatch: 1,
            totalBatches: 1
          }))
        } else {
          // We have a large dataset, estimate total batches conservatively
          const estimatedTotal = Math.min(MAX_TOTAL_ENTRIES, batchSize * BATCH_SIZE_MULTIPLIER)
          totalBatches = Math.ceil(estimatedTotal / batchSize)

          setProgress(prev => ({
            ...prev,
            totalEntries: estimatedTotal,
            totalBatches,
            loadedEntries: 0
          }))

          // Now fetch in proper batches
          let skip = 0
          let hasMore = true
          let batchNumber = 0
          let consecutiveEmptyBatches = 0
          // Estimate based on query type - these are reasonable estimates for safety
          const estimatedEntries = isLargeDataset ? 50_000 : 10_000
          // Calculate dynamic batch limit based on estimate, but cap with hard limit
          const dynamicBatchLimit = Math.ceil(estimatedEntries / batchSize) + 2
          const effectiveBatchLimit = Math.min(dynamicBatchLimit, MAX_BATCHES_HARD_LIMIT)

          while (hasMore && batchNumber < effectiveBatchLimit) {
            batchNumber++
            
            setProgress(prev => ({
              ...prev,
              currentBatch: batchNumber,
              stage: 'loading'
            }))

            const result = await executeQuery({
              variables: {
                ...queryVariables,
                query: {
                  ...queryVariables?.query,
                  limit: batchSize,
                  skip: skip
                }
              }
            })

            // Extract entries from result - handle different possible field names
            const batchEntries = result.data?.timeEntries || result.data?.report || []

            // Debug logging for development
            debugLogger.log(`[Excel Export] Batch ${batchNumber}: skip=${skip}, limit=${batchSize}, got ${batchEntries.length} entries`)
            
            // Check for duplicates by looking at valid IDs (exclude entries with missing IDs)
            if (batchEntries.length > 0 && allEntries.length > 0) {
              const getValidIds = (entries: Array<{ id?: unknown }>) =>
                entries
                  .map((e) => e.id)
                  .filter(
                    (id: unknown): id is string | number =>
                      id !== null && id !== undefined
                  )
                  .map(String)

              const newIds = new Set(getValidIds(batchEntries))
              const existingIds = new Set(getValidIds(allEntries))
              const duplicates = Array.from(newIds).filter((id: string) =>
                existingIds.has(id)
              )

              if (duplicates.length > 0) {
                debugLogger.error(
                  `[Excel Export] DUPLICATE ENTRIES DETECTED! ${duplicates.length} duplicates in batch ${batchNumber}`,
                  duplicates.slice(0, 5)
                )
              }
            }
            
            // Check for no data or if we've exceeded expected total
            if (batchEntries.length === 0) {
              consecutiveEmptyBatches++
              if (consecutiveEmptyBatches >= MAX_CONSECUTIVE_EMPTY_BATCHES) {
                debugLogger.log(
                  `[Excel Export] Stopping due to ${consecutiveEmptyBatches} consecutive empty batches`
                )
                hasMore = false
                break
              }
            } else {
              consecutiveEmptyBatches = 0 // Reset counter
            }

            // Safety check: stop if we have significantly more data than estimated
            if (allEntries.length > estimatedEntries * SAFETY_MULTIPLIER_OVER_ESTIMATE) {
              debugLogger.warn(
                `[Excel Export] STOPPING: Got ${allEntries.length} entries, estimated ~${estimatedEntries}. ` +
                  'Data size exceeded estimate by more than 2x, stopping as safety measure.'
              )
              hasMore = false
              break
            }

            allEntries = [...allEntries, ...batchEntries]
            const loadedEntries = allEntries.length
            
            // Multiple termination conditions:
            // 1. Got fewer entries than requested (normal end)
            // 2. Reached estimated limit (safety)
            // 3. Hit batch limit
            const normalEnd = batchEntries.length < batchSize
            const reachedEstimate = loadedEntries >= estimatedEntries
            const hitBatchLimit = batchNumber >= MAX_BATCHES_HARD_LIMIT
            
            hasMore = !normalEnd && !reachedEstimate && !hitBatchLimit
            
            // Update total batches based on actual data
            if (!hasMore) {
              totalBatches = batchNumber
            }

            setProgress(prev => ({
              ...prev,
              totalEntries: loadedEntries,
              loadedEntries,
              progress: Math.min((batchNumber / Math.max(totalBatches, batchNumber)) * 70, 70),
              totalBatches: Math.max(totalBatches, batchNumber)
            }))

            // Debug the termination condition
            debugLogger.log(
              `[Excel Export] Batch ${batchNumber}: got ${batchEntries.length} entries, ` +
                `total: ${loadedEntries}, normalEnd: ${normalEnd}, reachedEstimate: ${reachedEstimate}, hasMore: ${hasMore}`
            )

            // Increment skip for next batch
            skip += batchSize

            // Small delay to prevent overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100))
          }

          // Final safety check and warnings
          if (batchNumber >= MAX_BATCHES_HARD_LIMIT) {
            debugLogger.warn(
              `[Excel Export] Stopped at safety limit of ${MAX_BATCHES_HARD_LIMIT} batches`
            )
          }

          if (allEntries.length > estimatedEntries * 1.5) {
            debugLogger.warn(
              `[Excel Export] Info: Got ${allEntries.length} entries, estimated ~${estimatedEntries}`
            )
          }
        }
      } else {
        // For small datasets, fetch all at once
        const result = await executeQuery({
          variables: queryVariables
        })
        allEntries = result.data?.timeEntries || result.data?.report || []
        
        setProgress(prev => ({
          ...prev,
          totalEntries: allEntries.length,
          loadedEntries: allEntries.length,
          progress: 70,
          currentBatch: 1,
          totalBatches: 1
        }))
      }

      // Processing stage
      setProgress(prev => ({
        ...prev,
        stage: 'processing',
        progress: 80
      }))

      // Generate Excel file
      setProgress(prev => ({
        ...prev,
        stage: 'generating',
        progress: 90
      }))

      const formattedFileName = format(
        fileName,
        new Date().toDateString().split(' ').join('-')
      )

      await exportExcel(allEntries, {
        columns,
        fileName: formattedFileName
      })

      // Complete
      setProgress(prev => ({
        ...prev,
        stage: 'complete',
        progress: 100,
        isExporting: false
      }))

      // Reset after a short delay
      setTimeout(() => {
        setProgress({
          isExporting: false,
          totalEntries: 0,
          loadedEntries: 0,
          progress: 0,
          currentBatch: 0,
          totalBatches: 0,
          stage: 'loading'
        })
      }, 3000)

    } catch (error) {
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
        return t('reports.exportProgressProcessing', { count: progress.totalEntries })
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