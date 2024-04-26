import {
  CheckboxControl,
  FormGroup,
  InputControl,
  InputControlOptions,
  SliderControl
} from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectFormTabComponent } from '../types'

export const BudgetTracking: ProjectFormTabComponent = ({
  register,
  model
}) => {
  const { t } = useTranslation()
  return (
    <FormGroup gap={15}>
      <CheckboxControl
        {...register('budgetTracking.trackingEnabled')}
        label={t('projects.budgetTrackingEnabled')}
        description={t('projects.budgetTrackingEnabledDescription')}
      />
      <InputControl
        {...register<InputControlOptions>('budgetTracking.hours', {})}
        label={t('projects.budgetHours')}
        description={t('projects.budgetHoursDescription')}
        type='number'
        hidden={!model.value('budgetTracking.trackingEnabled' as any)}
      />
      <SliderControl
        {...register('budgetTracking.warningThreshold')}
        label={t('projects.budgetWarningThreshold')}
        description={t('projects.budgetWarningThresholdDescription')}
        formatValue={(value) => `${value * 100}%`}
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.8}
        hidden={!model.value('budgetTracking.trackingEnabled' as any)}
      />
      <SliderControl
        {...register('budgetTracking.criticalThreshold')}
        label={t('projects.budgetCriticalThreshold')}
        description={t('projects.budgetCriticalThresholdDescription')}
        formatValue={(value) => `${value * 100}%`}
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.9}
        hidden={!model.value('budgetTracking.trackingEnabled' as any)}
      />
    </FormGroup>
  )
}
