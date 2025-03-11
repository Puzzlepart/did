import {
  CheckboxControl,
  FormGroup,
  InputControl,
  InputControlOptions,
  SliderControl,
  useFormContext
} from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectFormTabComponent } from '../types'

export const BudgetTracking: ProjectFormTabComponent = () => {
  const { t } = useTranslation()
  const { register, getExtensionValue } = useFormContext()
  return (
    <FormGroup gap={15}>
      <CheckboxControl
        {...register('trackingEnabled', {}, BudgetTracking.extensionId)}
        label={t('projects.budgetTrackingEnabled')}
        description={t('projects.budgetTrackingEnabledDescription')}
      />
      <InputControl
        {...register<InputControlOptions>(
          'hours',
          {},
          BudgetTracking.extensionId
        )}
        label={t('projects.budgetHours')}
        description={t('projects.budgetHoursDescription')}
        type='number'
        hidden={
          !getExtensionValue('trackingEnabled', BudgetTracking.extensionId)
        }
      />
      <SliderControl
        {...register('warningThreshold', {}, BudgetTracking.extensionId)}
        label={t('projects.budgetWarningThreshold')}
        description={t('projects.budgetWarningThresholdDescription')}
        formatValue={(value) => `${value * 100}%`}
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.8}
        hidden={
          !getExtensionValue('trackingEnabled', BudgetTracking.extensionId)
        }
      />
      <SliderControl
        {...register('criticalThreshold', {}, BudgetTracking.extensionId)}
        label={t('projects.budgetCriticalThreshold')}
        description={t('projects.budgetCriticalThresholdDescription')}
        formatValue={(value) => `${value * 100}%`}
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.9}
        hidden={
          !getExtensionValue('trackingEnabled', BudgetTracking.extensionId)
        }
      />
    </FormGroup>
  )
}

BudgetTracking.displayName = 'BudgetTracking'
BudgetTracking.extensionId = '4bb5dfa9-a742-4692-8aa9-86de79961a70'
