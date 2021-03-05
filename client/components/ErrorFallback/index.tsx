import { DefaultButton } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ErrorFallback.module.scss'

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation()
  return (
    <div role='alert' className={styles.root}>
      <div className={styles.header}>{t('common.errorFallbackHeader')}</div>
      <pre>Error: {error.message}</pre>
      <DefaultButton
        onClick={resetErrorBoundary}
        text={t('common.tryAgainText')}
      />
    </div>
  )
}
