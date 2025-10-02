import { format } from '@fluentui/react'
import { IListColumn } from 'components/List/types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TimeEntry } from 'types'
import { exportExcel } from 'utils/exportExcel'
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
      let skip = 0
      let hasMore = true
      let batchNumber = 0

      // For large datasets, use pagination
      if (isLargeDataset) {
        while (hasMore) {
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
                skip
              }
            }
          })

          const batchEntries = result.data?.timeEntries || result.data?.report || []
          allEntries = [...allEntries, ...batchEntries]
          
          const loadedEntries = allEntries.length
          hasMore = batchEntries.length === batchSize
          skip += batchSize

          // Estimate total entries based on first batch
          const estimatedTotal = batchNumber === 1 && hasMore 
            ? Math.ceil(loadedEntries * 3) // Conservative estimate
            : loadedEntries

          setProgress(prev => ({
            ...prev,
            totalEntries: estimatedTotal,
            loadedEntries,
            progress: hasMore ? (loadedEntries / estimatedTotal) * 70 : 70, // 70% for loading
            totalBatches: hasMore ? Math.ceil(estimatedTotal / batchSize) : batchNumber
          }))

          // Small delay to prevent overwhelming the server
          await new Promise(resolve => setTimeout(resolve, 100))
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
      // eslint-disable-next-line no-console
      console.error('Error exporting to Excel:', error)
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