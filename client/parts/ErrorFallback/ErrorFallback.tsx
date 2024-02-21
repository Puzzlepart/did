import { Button, Label } from '@fluentui/react-components'
import $date from 'DateUtils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { getFluentIcon } from 'utils'
import styles from './ErrorFallback.module.scss'
import { IErrorFallbackProps } from './types'

/**
 * Error fallback for `<ErrorBoundary />`  from
 * `react-error-boundary`
 *
 * Shows the `error` message and provides a
 * button that  executes `resetErrorBoundary` that might
 * temporarily solve the issue (in some cases).
 *
 * @category Function Component
 */
export const ErrorFallback: StyledComponent<IErrorFallbackProps> = ({
  error,
  resetErrorBoundary
}) => {
  const { t } = useTranslation()
  return (
    <div role='alert' className={ErrorFallback.className}>
      <div className={styles.header}>{t('common.errorFallbackHeader')}</div>
      <div>
        <Label weight='semibold'>{t('common.timeLabel')}: </Label>
        {$date.formatDate(new Date(), 'MMM DD, YYYY HH:mm')}
      </div>
      <pre className={styles.message}>
        <Label weight='semibold'>{t('common.error')}:</Label> {error.message}
      </pre>
      <div>
        <Button
          appearance='subtle'
          icon={getFluentIcon('Umbrella')}
          onClick={resetErrorBoundary}
        >
          {t('common.tryAgainText')}
        </Button>
      </div>
    </div>
  )
}

ErrorFallback.displayName = 'ErrorFallback'
ErrorFallback.className = styles.errorFallback
