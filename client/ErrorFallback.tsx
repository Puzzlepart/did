/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import { DefaultButton } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation()
  return (
    <div role='alert'>
      <p>{t('common.errorFallbackHeader')}</p>
      <pre>Error: {error.message}</pre>
      <DefaultButton
        onClick={resetErrorBoundary}
        text={t('common.tryAgainText')}
      />
    </div>
  )
}
