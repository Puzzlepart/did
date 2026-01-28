import { ProgressBar } from '@fluentui/react-components'
import React, { FC } from 'react'
import styles from './ExportProgress.module.scss'

interface IExportProgressProps {
  progress: {
    isExporting: boolean
    progress: number
    totalEntries: number
    loadedEntries: number
    currentBatch: number
    totalBatches: number
    stage: 'loading' | 'processing' | 'generating' | 'complete'
  }
  progressMessage: string
}

/**
 * Progress indicator for Excel export with large datasets
 */
export const ExportProgress: FC<IExportProgressProps> = ({
  progress,
  progressMessage
}) => {
  if (!progress.isExporting) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.message}>{progressMessage}</div>
      <ProgressBar
        value={progress.progress}
        max={100}
        className={styles.progressBar}
      />
      {progress.stage === 'loading' && progress.totalBatches > 1 && (
        <div className={styles.details}>
          {progress.loadedEntries.toLocaleString()} entries loaded
          {progress.totalEntries > 0 && (
            <> of ~{progress.totalEntries.toLocaleString()}</>
          )}
        </div>
      )}
    </div>
  )
}

ExportProgress.displayName = 'ExportProgress'
