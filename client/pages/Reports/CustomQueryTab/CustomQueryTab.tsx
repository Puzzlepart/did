import {
  Body1,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Spinner,
  Subtitle1
} from '@fluentui/react-components'
import { DateField } from 'components/FormControl'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CustomQueryTab.module.scss'
import { useCustomQueryTab } from './useCustomQueryTab'

/**
 * Custom query tab component that allows users to create and
 * execute custom report queries using the ReportsQuery parameters.
 *
 * @category Reports
 */
export const CustomQueryTab: FC = () => {
  const { t } = useTranslation()
  const {
    formState,
    updateField,
    executeReport,
    isFormValid,
    loading
  } = useCustomQueryTab()

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader
          header={<Subtitle1>{t('reports.customQueryHeaderText')}</Subtitle1>}
        />

        <div className={styles.formSection}>
          <Body1>{t('reports.filterCriteria')}</Body1>
          
          <div className={styles.formRow}>
            <DateField
              label={t('common.startDate')}
              value={formState.startDateTime}
              onSelectDate={(date) => updateField('startDateTime', date)}
            />
            <DateField
              label={t('common.endDate')}
              value={formState.endDateTime}
              onSelectDate={(date) => updateField('endDateTime', date)}
            />
          </div>
          
          <div className={styles.formRow}>
            <Field label={t('common.weekNumberLabel')}>
              <Input 
                type='number' 
                className={styles.numberInput}
                value={formState.week?.toString() || ''}
                onChange={(_, data) => updateField('week', Number.parseInt(data.value, 10) || undefined)}
                min={1}
                max={53}
              />
            </Field>
            
            <Field label={t('common.monthLabel')}>
              <Input 
                type='number' 
                className={styles.numberInput}
                value={formState.month?.toString() || ''}
                onChange={(_, data) => updateField('month', Number.parseInt(data.value, 10) || undefined)}
                min={1}
                max={12}
              />
            </Field>
            
            <Field label={t('common.yearLabel')}>
              <Input 
                type='number' 
                className={styles.numberInput}
                value={formState.year?.toString() || ''}
                onChange={(_, data) => updateField('year', Number.parseInt(data.value, 10) || undefined)}
                min={2000}
                max={2100}
              />
            </Field>
          </div>
          
          <div className={styles.formRow}>
            <Field label={t('common.projectId')}>
              <Input 
                value={formState.projectId || ''}
                onChange={(_, data) => updateField('projectId', data.value)}
                placeholder='e.g. PROJ123'
              />
            </Field>
          </div>
          
          <div className={styles.actions}>
            {loading && <Spinner size='tiny' />}
            <Button
              appearance='primary'
              disabled={!isFormValid || loading}
              onClick={executeReport}
            >
              {t('reports.runReport')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
