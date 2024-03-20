import { Field, ProgressBar } from '@fluentui/react-components'
import { InformationProperty } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './BudgetTracking.module.scss'
import { useBudgetTracking } from './useBudgetTracking'
import { useSubscriptionSettings } from 'AppContext'

/**
 * Shows details about the selected project.
 *
 * @category Projects
 */
export const BudgetTracking: StyledComponent = () => {
  const { t } = useTranslation()
  const { budgetTracking } = useSubscriptionSettings()
  const {
    loading,
    budgetTrackingEnabled,
    hours,
    budget,
    used,
    getValidationStateFromThreshold
  } = useBudgetTracking()

  if (!budgetTrackingEnabled || !budgetTracking.enabled) {
    return null
  }
  return (
    <InformationProperty
      title={t('projects.budgetTracking')}
      onRenderValue={() => (
        <div className={styles.budgetTracking}>
          <Field
            validationState={getValidationStateFromThreshold()}
            validationMessage={t('projects.budgetHoursUsed', {
              hours,
              budget
            })}
          >
            <ProgressBar value={used} />
          </Field>
        </div>
      )}
      isDataLoaded={!loading}
    />
  )
}
